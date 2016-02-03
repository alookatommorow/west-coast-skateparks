function MarkerGenerator(map, skateparks) {
  var types = ['favorite', 'visited', 'both'];
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot' };
  var toggleable = { favorite: [], visited: [], both: [] };
  var allMarkers = [];

  var nearbyMarkers = [];

  this.generateMainMarker = function (skatepark) {
    var title = skatepark.city+', '+skatepark.state;
    var marker = manifestMarker(skatepark, title);
    var infowindow = marker['infowindow'];
    marker.main = true;
    bindListenerToMarker(map, allMarkers, marker, infowindow);
    allMarkers.push(marker);
  }

  this.generateNearbyMarkers = function (skatepark) {
    skatepark.nearbyParks.forEach(function(park){
      var park = JSON.parse(park);
      var title = park.city+', '+park.state + ' (nearby)';
      var icon = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
      var marker = manifestMarker(park, title, icon);
      var infowindow = marker['infowindow'];
      bindListenerToMarker(map, allMarkers, marker, infowindow);
      allMarkers.push(marker);
    });
  }

  // for user#show
  this.generateMarkers = function () {
    types.forEach(function (type) {
      skateparks[type].forEach(function (skatepark) {
        createMarker(map, skatepark, type);
      });
      addMarkerToggleListener(type);
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

  //for user#show
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
    bindListenerToMarker(map, allMarkers, marker, infowindow);
    allMarkers.push(marker);
  }

  function bindListenerToMarker(map, allMarkers, marker, infowindow) {
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      infowindow.open(map, marker);
    });
  }

  // for skatepark #show
  function manifestMarker(skatepark, title, icon){
    var latLng = { lat: skatepark.latitude, lng: skatepark.longitude };
    var infowindow = new google.maps.InfoWindow({
      content: generateContentString(skatepark)
    });
    var marker = new google.maps.Marker({
      position: latLng,
      infowindow: infowindow,
      icon: icon,
      map: map,
      title: title
    });
    return marker;
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
