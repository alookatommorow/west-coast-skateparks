function addNearbyParkMarkers(map, skatepark, nearbyParks) {
  if (nearbyParks.length > 0) {
    var nearbyMarkers = [];
    nearbyParks.forEach(function(park){
      var position = {lat: park.latitude, lng: park.longitude}
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
        title: park.city+', '+park.state + ' (nearby)'
      });
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


function toggleMarkerVisibility(markers, visibility) {
  markers.forEach(function (marker) {
    marker.setVisible(visibility);
  });
}