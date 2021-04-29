// EXAMPLE CONFIG
//
// {
//   stars: {
//     comparator: 'equal' or 'at least'
//     value: 2,
//     ui: true,
//   },
//   nameCity: {
//     value: 'los feliz'
//     values: ['los', 'feliz'],
//     useExact: true,
//     ui: true,
//   },
//   distance: {
//     value: 3, (distance in miles),
//     fromLat: 24.188,
//     fromLng  : 24.188,
//     ui: true,
//   },
//   obstacles: {
//     value: 'los feliz'
//     values: ['los', 'feliz'],
//     ui: true,
//   },
//   states: {
//     value: 'los feliz'
//     values: ['los', 'feliz'],
//     ui: true,
//   },
// }

const distanceBetween = function(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const radtheta = (Math.PI * (lon1 - lon2)) / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    // if (unit == "K") { dist = dist * 1.609344 }
    // if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}


const filterDistance = function (park, distance) {
  const dist = distanceBetween(park.latitude, park.longitude, distance.fromLat, distance.fromLng);
  if (dist > distance.value) return false;

  return true;
}

const createBoldString = (attrString, matchIndex, filter) => {
  let output = titleize(attrString);

  return `${
    output.slice(0, matchIndex)
  }<span class="orange">${
    output.slice(matchIndex, matchIndex + filter.length)
  }</span>${
    output.slice(matchIndex + filter.length)
  }`;
};

const filterStars = function(skatepark, stars) {
  // since all parks have at least 1 star, just return true
  if (stars.comparator === 'at least' && Number(stars.value) === 1) return true;

  if (stars.comparator === 'at least') {
    if (Number(skatepark.rating) < Number(stars.value)) {
      return false;
    }
  } else {
    if (Number(skatepark.rating) !== Number(stars.value)) {
      return false;
    }
  }

  return true;
}

const filterNameCity = function (skatepark, config) {
  if (config.value.length < 1) return true;

  const attrsToSearch = ['city', 'name'];
  let hasMatch = false;
  let valuesToSearch = [config.value];

  if (!config.useExact) {
    // filter empty strings from array of non-exact search terms
    valuesToSearch = config.values.filter(query => query !== '');
  }

  valuesToSearch.forEach(value => {
    // for each value, search on each attribute
    // setting to true if there's a match
    // so the given query can match in each attribute
    for (var attr of attrsToSearch) {
      if (filterText(skatepark, attr, value, config.useExact)) {
        hasMatch = true;
      }
    }
  })

  return hasMatch;
}

const filterText = function(skatepark, attr, value, useExact) {
  if (!skatepark[attr]) return false;

  let splitAttr = skatepark[attr].toLowerCase().split(' ');
  let hasMatch = false;
  let matchIndex;

  // if using exact search or only 1 search term
  if (useExact || splitAttr.length < 2) {
    // find match and set display string
    matchIndex = skatepark[attr].toLowerCase().indexOf(value.toLowerCase());
    if (matchIndex > -1) {
      hasMatch = true;
      skatepark.displayHtmlStrings[attr] = createBoldString(skatepark[attr], matchIndex, value);
    }
  } else {
    // if there's already a match in every word of attr, skip
    if (Object.values(skatepark.matches[attr]).length === splitAttr.length) return true;

    // set disaply string for each word in attr
    skatepark.displayHtmlStrings[attr] = splitAttr.map(word => {
      // if word of attr already memoized in matches, return match
      if (skatepark.matches[attr][word]) {
        hasMatch = true;
        return skatepark.matches[attr][word];
      } else {
        // find match, generate bold string, set to matches for memoization, and return it
        matchIndex = word.indexOf(value.toLowerCase());
        if (matchIndex > -1) {
          hasMatch = true;
          skatepark.matches[attr][word] = createBoldString(word, matchIndex, value);
          return skatepark.matches[attr][word];
        }
      }

      return titleize(word);
    }).join(' ');
  }

  return hasMatch;
}

const MAP = {
  stars: filterStars,
  nameCity: filterNameCity,
  distance: filterDistance,
}

export const filterSkateparks = function(parks, config)  {
  if (!parks || !config) return null;

  let parkIsAMatch;

  return parks.filter(skatepark => {
    skatepark.displayHtmlStrings = {};

    // when non-exact text filtering
    // use matches object to memoize matches in each word of name/city
    if (!config.nameCity.useExact) {
      skatepark.matches = { city: {}, name: {}, obstacles: {} };
    }

    // for each config key
    // if there's a value for the key, run associated filter
    // returning false if it doesnt pass any filter
    for (var setting of Object.keys(config)) {
      if (config[setting] && config[setting].value) {
        parkIsAMatch = MAP[setting](skatepark, config[setting]);
        if (!parkIsAMatch) return false;
      }
    }

    return true
  });
}
