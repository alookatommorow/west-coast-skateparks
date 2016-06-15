function generateMap(response) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: response.zoom
  });

  new MapGenerator(map, response.skateparks).initializeMap();
}

function MapGenerator(map, skateparks) {
  var types = Object.keys(skateparks);
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot', nearby: 'green-dot', main: 'red-dot' };
  var toggleable = { favorite: [], visited: [], both: [], nearby: [], main: [] };
  var allMarkers = [];

  this.initializeMap = function() {
    generateMarkers();
    setMapCenter();
    setStyles();
    showButtons();
  };

  function generateMarkers() {
    types.forEach(function(type) {
      skateparks[type].forEach(function (skatepark) {
        var marker = createMarker(skatepark, type);
        toggleable[type].push(marker);
        allMarkers.push(marker);
        bindCloseInfowindowsListenerToMarker(marker);
      });
      bindVisibilityListenerToButton(type);
    });
  }

  function setMapCenter() {
    if (toggleable.main.length > 0) {
      map.setCenter(toggleable.main[0].position);
    } else if (allMarkers.length > 0) {
      map.setCenter(allMarkers[0].position);
    } else {
      map.setCenter(new google.maps.LatLng(37.7833, -122.4167));
    }
  }

  function setStyles() {
    map.setOptions({styles: mapStyles});
  }

  function showButtons() {
    for (var type in toggleable) {
      if (toggleable[type].length > 0) {
        $('#toggle-'+type+'-container').removeClass('hidden').addClass('inline-block');
      }
    }
  }

  function createMarker(skatepark, type){
    var latLng = { lat: skatepark.latitude, lng: skatepark.longitude };
    var infowindow = new infowindowGenerator(skatepark).generateInfowindow();
    var title = titleize(skatepark.city + ', ' + stateDisplay[skatepark.state])
    var marker = new google.maps.Marker({
      position: latLng,
      infowindow: infowindow,
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/' + legend[type] + '.png',
      title: title
    });
    if (type === 'main') {
      marker.main = true;
    } else if (type === 'nearby') {
      marker.setVisible(false);
    }
    return marker;
  }

  // private methods
  function bindVisibilityListenerToButton(type) {
    var buttonId = '#toggle-' + type;
    $(document).on('click', buttonId, function (event) {
      var $button = $(event.target);
      var action = $button.text().split(' ');

      toggleMarkerVisibility(toggleable[type], action[0]);
      toggleButtonText($button, action);
    });
  }

  function toggleButtonText(button, action) {
    action[0] = (action[0] === 'Hide') ? 'Show' : 'Hide';
    button.text(action.join(' '));
  }

  function bindCloseInfowindowsListenerToMarker(marker) {
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      marker.infowindow.open(map, marker);
    });
  }

  function toggleMarkerVisibility(markers, visibility) {
    visibility = (visibility === 'Hide') ? false : true;
    markers.forEach(function (marker) {
      if (marker.main) {
        return;
      }
      marker.infowindow.close();
      marker.setVisible(visibility);
    });
  }
}
