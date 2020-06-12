import React, { useState, useEffect, useRef } from 'react';
import useToggle from 'hooks/useToggle';
import StarInput from 'components/StarInput';
import { SKATEPARK_ATTRS } from './constants';

function AdvancedSearch(props) {
  const { caParks, orParks, waParks, initialQuery } = props;
  const [stars, setStars] = useState(1);
  const [nameCity, setNameCity] = useState(initialQuery);
  const [splitNameCity, setSplitNameCity] = useState(initialQuery && initialQuery.split(' '));
  const [obstacles, setObstacles] = useState(null);
  const [splitObstacles, setSplitObstacles] = useState(null);
  const [starsAtLeastIsOn, setStarsAtLeastIsOn] = useState(false);
  const [starsEqualIsOn, setStarsEqualIsOn] = useState(false);
  const [hasBeenSorted, setHasBeenSorted] = useState(false);
  const { toggleIsOn: exactMatchIsOn, toggle: toggleExactMatchIsOn } = useToggle(true);
  const { toggleIsOn: ca, toggle: toggleCa } = useToggle(true);
  const { toggleIsOn: or, toggle: toggleOr } = useToggle(true);
  const { toggleIsOn: wa, toggle: toggleWa } = useToggle(true);
  const [skateparks, setSkateparks] = useState([...caParks, ...orParks, ...waParks ]);
  const [sortAttr, setSortAttr] = useState('state');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    if (!starsAtLeastIsOn && !starsEqualIsOn) setStarsAtLeastIsOn(true);
  }, [stars]);

  useEffect(() => {
    if (starsAtLeastIsOn) setStarsEqualIsOn(false);
  }, [starsAtLeastIsOn]);

  useEffect(() => {
    if (starsEqualIsOn) setStarsAtLeastIsOn(false);
  }, [starsEqualIsOn]);

  useEffect(() => {
    const newSkateparks = [
      ...(ca ? caParks : []),
      ...(or ? orParks : []),
      ...(wa ? waParks : []),
    ];
    setSkateparks(hasBeenSorted ? newSkateparks.sort(compareAttrs) : newSkateparks);
  }, [ca, or, wa]);

  useEffect(() => {
    if (hasBeenSorted) setSkateparks([...skateparks].sort(compareAttrs));
  }, [sortAttr, sortDirection]);

  const toggleStarsEqualIsOn = () => setStarsEqualIsOn(!starsEqualIsOn);
  const togglestarsAtLeastIsOn = () => setStarsAtLeastIsOn(!starsAtLeastIsOn);
  const isSorted = attrToCheck => attrToCheck === sortAttr;
  const hasSortDirection = attrToCheck => attrToCheck === sortAttr ? ` ${sortDirection}` : '';
  const filterParks = () => skateparks.filter(skatepark => filterSkateparks(skatepark));
  const handleNameCityChange = event => {
    const { target: { value } } = event;

    setNameCity(value);
    setSplitNameCity(value.split(' '));
  };

  const handleObstaclesChange = event => {
    const { target: { value } } = event;

    setObstacles(value);
    setSplitObstacles(value.split(' '));
  };

  const filterTextAttr = (skatepark, attr, filter, useExact) => {
    if (!skatepark[attr]) return false;

    let splitValue = skatepark[attr].toLowerCase().split(' ');
    let hasMatch = false;
    let matchIndex;

    if (!useExact && splitValue.length > 1) {
      if (Object.values(skatepark.matches[attr]) === splitValue.length) return true;

      skatepark.displayHtmlStrings[attr] = splitValue.map((str, index) => {
        if (!skatepark.matches[attr][str]) {
          matchIndex = str.indexOf(filter.toLowerCase());
          if (matchIndex > -1) {
            hasMatch = true;
            skatepark.matches[attr][str] = createBoldString(str, matchIndex, filter);
            return skatepark.matches[attr][str];
          }
        } else {
          hasMatch = true;
          return skatepark.matches[attr][str];
        }
        return titleize(str);
      }).join(' ');
    } else {
      matchIndex = skatepark[attr].toLowerCase().indexOf(filter.toLowerCase());
      if (matchIndex > -1) {
        skatepark.displayHtmlStrings[attr] = createBoldString(skatepark[attr], matchIndex, filter);
        hasMatch = true;
      }
    }

    return hasMatch;
  }

  const handleStarsChange = event => {
    const { currentTarget: { value } } = event;
    let newStars = Number(value);

    if (newStars === Number(stars) && Number(stars) > 1) {
      newStars -= 1;
    }

    setStars(newStars);
  };

  const filterSkateparks = skatepark => {
    skatepark.displayHtmlStrings = {};
    skatepark.matches = { city: {}, name: {}, obstacles: {} };

    if (starsAtLeastIsOn && (Number(skatepark.rating) < Number(stars))) {
      return false;
    }

    if (starsEqualIsOn && (Number(skatepark.rating) !== Number(stars))) {
      return false;
    }

    if (nameCity && nameCity !== '') {
      let nameCityMatch = false;

      if (exactMatchIsOn) {
        if (filterTextAttr(skatepark, 'city', nameCity, exactMatchIsOn)) {
          nameCityMatch = true;
        }

        if (filterTextAttr(skatepark, 'name', nameCity, exactMatchIsOn)) {
          nameCityMatch = true;
        }
      } else {
        splitNameCity.filter(query => query !== '').map(query => {
          if (filterTextAttr(skatepark, 'city', query, exactMatchIsOn)) {
            nameCityMatch = true;
          }

          if (filterTextAttr(skatepark, 'name', query, exactMatchIsOn)) {
            nameCityMatch = true;
          }
        });
      }

      if (!nameCityMatch) return false;
    }

    if (obstacles && obstacles !== '') {
      let obstaclesMatch = false;

      splitObstacles.filter(query => query !== '').map(query => {
        if (filterTextAttr(skatepark, 'obstacles', query, false)) {
          obstaclesMatch = true;
        }
      });

      if (!obstaclesMatch) return false;
    }

    return true;
  }

  const keySort = event => {
    const keyCode = event.code || event.which;
    if (keyCode === 13 || keyCode === 32) {
      handleTableHeaderClick(event);
    }
  }

  const compareAttrs = (a, b) => {
    const varA = (typeof a[sortAttr] === 'string') ?
      a[sortAttr].toUpperCase() : a[sortAttr];
    const varB = (typeof b[sortAttr] === 'string') ?
      b[sortAttr].toUpperCase() : b[sortAttr];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return sortDirection === 'desc' ? (comparison * -1) : comparison;
  };

  const handleTableHeaderClick = event => {
    const { currentTarget: { attributes: { name: { value } } } } = event;
    const newDirection = (sortAttr === value && sortDirection === 'asc') ? 'desc' : 'asc';

    if (!hasBeenSorted) setHasBeenSorted(true);
    setSortAttr(value)
    setSortDirection(newDirection)
  }

  const createBoldString = (attrString, matchIndex, filter) => {
    let output = titleize(attrString);
    const first = output.slice(0, matchIndex);
    const bold = output.slice(matchIndex, matchIndex + filter.length);
    const last = output.slice(matchIndex + filter.length);

    return `${first}<span class="orange">${bold}</span>${last}`;
  };

  const displayAttr = (park, attr) => {
    if (park.displayHtmlStrings && park.displayHtmlStrings[attr]) {
      return <span dangerouslySetInnerHTML={{ __html: park.displayHtmlStrings[attr] }} />;
    } else if (park[attr] && (attr === 'name' || attr === 'city' || attr === 'obstacles')) {
      return titleize(park[attr])
    }

    return park[attr];
  }

  const filteredParks = filterParks();

  return (
    <div className="advanced-search-container">
      <h2>Advanced Search</h2>
      <form>
        <div className="row">
          <div className="field">
            <label htmlFor="name-city" className="label">
              Name/City
            </label>
            <input name="name-city" type="text" value={nameCity} onChange={handleNameCityChange} />
          </div>
          <div className="field column states">
            <label htmlFor="states" className="label">
              State
            </label>
            <div className="row">
              <label htmlFor="california">
                <input name="california" type="checkbox" checked={ca} onChange={toggleCa} />
                CA
              </label>
              <label htmlFor="oregon">
                <input name="oregon" type="checkbox" checked={or} onChange={toggleOr} />
                OR
              </label>
              <label htmlFor="washington">
                <input name="washington" type="checkbox" checked={wa} onChange={toggleWa} />
                WA
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="stars" className="label">
              Stars
            </label>
            <div className="row">
              <div className="column">
                <label htmlFor="starsAtLeastIsOn">
                  <input name="starsAtLeastIsOn" type="checkbox" checked={starsAtLeastIsOn} onChange={togglestarsAtLeastIsOn} />
                  at least
                </label>
                <label htmlFor="starsEqualIsOn">
                  <input name="starsEqualIsOn" type="checkbox" checked={starsEqualIsOn} onChange={toggleStarsEqualIsOn} />
                  equal to
                </label>
              </div>
              <StarInput
                stars={stars}
                handleClick={handleStarsChange}
                setStars={setStars}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="obstacles" className="label">
              Obstacles
            </label>
            <input name="obstacles" type="text" onChange={handleObstaclesChange} />
          </div>
        </div>
        <div className="row">
          <label htmlFor="starsAtLeastIsOn">
            <input name="starsAtLeastIsOn" type="checkbox" checked={exactMatchIsOn} onChange={toggleExactMatchIsOn} />
              Use exact match
          </label>
        </div>
      </form>
      <p className="num-results">
        {filteredParks.length} {`Result${filteredParks.length === 1 ? '' : 's'}`}
      </p>
      <div className="table">
        <div className="row table-header">
          {
            SKATEPARK_ATTRS.map(attrObj => (
              <div
                key={attrObj.name}
                className={`column ${attrObj.name}`}
                name={attrObj.name}
                role="button"
                tabIndex="0"
                onClick={handleTableHeaderClick}
                onKeyDown={keySort}
              >
                {attrObj.text}
                {isSorted(attrObj.name) && (
                  <i className={`fas fa-arrow-down sort-arrow${hasSortDirection(attrObj.name)}`}></i>
                )}
              </div>
            ))
          }
        </div>
        {filteredParks.map(park => (
          <a
            href={`/skateparks/${park.slug}`}
            key={park.slug}
            className="row"
          >
            {SKATEPARK_ATTRS.map(attrObj => (
              <div
                className={`column ${attrObj.name}`}
                key={`${park.slug}-${attrObj.name}`}
              >
                {displayAttr(park, attrObj.name)}
              </div>
            ))}
          </a>
        ))}
      </div>
    </div>
  );
};

export default props => <AdvancedSearch {...props} />
