function MarkerGenerator(map, skateparks) {
  var types = ['favorite', 'visited', 'both'];
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot' };
  var toggleable = { favorite: [], visited: [], both: [] };
  var allMarkers = [];

  this.generateMarkers = function () {
    types.forEach(function (type) {
      skateparks[type].forEach(function (skatepark) {
        createMarker(map, skatepark, type);
      });

      addMarkerToggleListener(type);
    });
  }

  this.generateMainMarker = function (skatepark) {
    var latLng = { lat: skatepark.latitude, lng: skatepark.longitude };
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: skatepark.city+', '+skatepark.state
    });
    var infowindow = new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }

  this.generateNearbyMarkers = function (skatepark) {
    if (skatepark.nearbyParks.length > 0) {
      var nearbyMarkers = [];
      skatepark.nearbyParks.forEach(function(park){
        var park = JSON.parse(park);
        var position = {lat: park.latitude, lng: park.longitude}
        var marker = new google.maps.Marker({
          position: position,
          map: map,
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
          title: park.city+', '+park.state + ' (nearby)'
        });

        addInfoWindow(map, park, marker, nearbyMarkers);
        nearbyMarkers.push(marker);
      });
    }

    $('#toggle-markers').on('click', function (event) {
      var $button = $(event.target);
      if ($button.text() === 'Hide Nearby Parks') {
        $button.text('Show Nearby Parks');
        toggleMarkerVisibility(nearbyMarkers, false);
      } else {
        $button.text('Hide Nearby Parks');
        toggleMarkerVisibility(nearbyMarkers, true);
      }
    });
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

  function createMarker(map, park, type) {
    park = JSON.parse(park);
    var markerPosition = {lat: park.latitude, lng: park.longitude};
    var infowindow = new google.maps.InfoWindow({
      content: generateContentString(park)
    });

    var marker = new google.maps.Marker({
      infowindow: infowindow,
      position: markerPosition,
      map: map,
      icon: 'https://maps.google.com/mapfiles/ms/icons/' + legend[type] + '.png',
      title: park.city + ', ' + park.state + ' (' + type + ')'
    });
    toggleable[type].push(marker);
    bindListenersToUserMarkers(map, allMarkers, marker, infowindow);
    allMarkers.push(marker);
  }

  function bindListenersToUserMarkers(map, allMarkers, marker, infowindow) {
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      infowindow.open(map, marker);
    });
  }

  function toggleMarkerVisibility(markers, visibility) {
    markers.forEach(function (marker) {
      marker.setVisible(visibility);
    });
  }

  function generateContentString(skatepark) {
    return "<div id='content'><div class='left'><img style='height:50px' src='"+skatepark.firstPicture+ "' ></div>"+skatepark.city+"</div>";
  }

  function addInfoWindow(map, skatepark, marker, allMarkers){
    var infowindow = new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
    marker['infowindow'] = infowindow;
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      infowindow.open(map, marker);
    });
  }
};
