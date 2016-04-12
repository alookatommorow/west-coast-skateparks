function MarkerGenerator(map, skateparks) {
  var types = Object.keys(skateparks);
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot', nearby: 'green-dot', main: 'red-dot' };
  var toggleable = { favorite: [], visited: [], both: [], nearby: [], main: [] };
  var allMarkers = [];

  this.generateMarkers = function () {
    types.forEach(function(type) {
      skateparks[type].forEach(function (skatepark) {
        var marker = createMarker(skatepark, type);
        toggleable[type].push(marker);
        allMarkers.push(marker);
        bindInfowindowListener(marker);
      });
      bindVisibilityListener(type);
    });
    return this;
  }

  this.showButtons = function() {
    for (var type in toggleable) {
      if (toggleable[type].length > 0) {
        $('#toggle-'+type+'-container').removeClass('hidden').addClass('inline-block');
      }
    }
  }

  function createMarker(skatepark, type){
    var latLng = { lat: skatepark.latitude, lng: skatepark.longitude };
    var infowindow = new infowindowGenerator(skatepark).generateInfowindow();
    var marker = new google.maps.Marker({
      position: latLng,
      infowindow: infowindow,
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/' + legend[type] + '.png',
      title: skatepark.city + ', ' + skatepark.state + ' (' + type + ')'
    });
    if (type === 'main') {
      marker.main = true;
    } else if (type === 'nearby') {
      marker.setVisible(false);
    }
    return marker;
  }

  // private methods
  function bindVisibilityListener(type) {
    $('#toggle-' + type).on('click', function (event) {
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

  function bindInfowindowListener(marker) {
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
