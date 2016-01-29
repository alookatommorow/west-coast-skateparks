//skatepark#show
function addInfoWindow(map, skatepark, marker, allMarkers){
  contentString = "<div id='content'>"+skatepark.city+"</div>"
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker['infowindow'] = infowindow;
  marker.addListener('click', function() {
    allMarkers.forEach(function(marker){
      marker.infowindow.close();
    });
    infowindow.open(map, marker);
  });
}

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



/////////  user#show

var types = ['favorite', 'visited', 'both'];
var legend = {favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot'}
var toggleable = {favorite: [], visited: [], both: []};
var allParks = []



function createMarker(map, park, type) {
  var markerPosition = {lat: park.latitude, lng: park.longitude};
  contentString = "<div id='content'>"+park.city+"</div>";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    infowindow: infowindow,
    position: markerPosition,
    map: map,
    icon: 'https://maps.google.com/mapfiles/ms/icons/' + legend[type] + '.png',
    title: park.city + ', ' + park.state + ' (' + type + ')'
  });
  toggleable[type].push(marker);
  bindListenersToUserMarkers(map, allParks, marker, infowindow);
  allParks.push(marker);
}

function bindListenersToUserMarkers(map, allMarkers, marker, infowindow) {
  marker.addListener('click', function() {
    allMarkers.forEach(function(marker){
      marker.infowindow.close();
    });
    infowindow.open(map, marker);
  });


}




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

function toggleMarkerVisibility(markers, visibility) {
  markers.forEach(function (marker) {
    marker.setVisible(visibility);
  });
}