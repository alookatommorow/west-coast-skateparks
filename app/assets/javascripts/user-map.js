function MarkerGenerator(map, skateparks, types) {
  // var types = ['favorite', 'visited', 'both', 'nearby', 'main'];
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot', nearby: 'green-dot', main: 'red-dot' };
  var toggleable = { favorite: [], visited: [], both: [], nearby: [], main: [] };
  var allMarkers = [];

  // for user#show
  this.generateMarkers = function () {
    types.forEach(function (type) {
      skateparks[type].forEach(function (skatepark) {
        if (type !== 'main') {
          skatepark = JSON.parse(skatepark);
        }
        var marker = createMarker(skatepark, type)
        var infowindow = marker['infowindow']
        toggleable[type].push(marker);
      });
      addMarkerToggleListener(type);
    });
  }

  // for skatepark #show
  function createMarker(skatepark, type){
    var latLng = { lat: skatepark.latitude, lng: skatepark.longitude };
    var infowindow = new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
    var marker = new google.maps.Marker({
      position: latLng,
      infowindow: infowindow,
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/' + legend[type] + '.png',
      title: skatepark.city + ', ' + skatepark.state + ' (' + type + ')'
    });
    if (type === 'main') {
      marker.main = true;
    }
    toggleable[type].push(marker);
    bindListenerToMarker(map, allMarkers, marker, infowindow);
    allMarkers.push(marker);
    return marker;
  }

  // private methods
  function addMarkerToggleListener(type) {
    $('#toggle-' + type).on('click', function (event) {
      var $button = $(event.target);
      var action = $button.text().split(' ')

      if (action[0] === 'Hide') {
        action[0] = 'Show'
        $button.text(action.join(' '));
        toggleMarkerVisibility(toggleable[type], false);
      } else {
        action[0] = 'Hide'
        $button.text(action.join(' '));
        toggleMarkerVisibility(toggleable[type], true);
      }
    });
  }

  function bindListenerToMarker(map, allMarkers, marker, infowindow) {
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      infowindow.open(map, marker);
    });
  }

  function toggleMarkerVisibility(markers, visibility) {
    markers.forEach(function (marker) {
      if (marker.main) {
        return;
      }
      marker.infowindow.close();
      marker.setVisible(visibility);
    });
  }

  function generateContentString(skatepark) {
    return "<div id='content'><div class='left'><img style='height:50px' src='"+skatepark.firstPicture+ "' ></div><strong><a href='/skateparks/"+skatepark.id+"'>"+skatepark.city+"</a></strong></div>";
  }

  ////// hide/show nearby parks
  $('#toggle-markers').on('click', function (event) {
    var $button = $(event.target);
    if ($button.text() === 'Hide Nearby Parks') {
      $button.text('Show Nearby Parks');
      toggleMarkerVisibility(allMarkers, false);
    } else {
      $button.text('Hide Nearby Parks');
      toggleMarkerVisibility(allMarkers, true);
    }
  });

};
