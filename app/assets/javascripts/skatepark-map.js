//// map js ////

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

function generateContentString(skatepark) {
  return "<div id='content'><div class='left'><img style='height:50px' src='"+skatepark.firstPicture+ "' ></div>"+skatepark.city+"</div>";
}

function addNearbyParkMarkers(map, skatepark) {
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


function toggleMarkerVisibility(markers, visibility) {
  markers.forEach(function (marker) {
    marker.setVisible(visibility);
  });
}


