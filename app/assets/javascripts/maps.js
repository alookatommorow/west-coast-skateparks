//skatepark#show
function addInfoWindow(map, skatepark, marker, allMarkers, infowindowPic){
  // contentString = skatepark.generate_info_window;
  var infowindow = new google.maps.InfoWindow({
    content: generateContentString(skatepark, infowindowPic)
  });
  marker['infowindow'] = infowindow;
  marker.addListener('click', function() {
    allMarkers.forEach(function(marker){
      marker.infowindow.close();
    });
    infowindow.open(map, marker);
  });
}

function generateContentString(skatepark, infowindowPic) {
  return "<div id='content'><div class='left'><img style='height:50px' src='"+infowindowPic+ "' ></div>"+skatepark.city+"</div>";

  // "https://storage.googleapis.com/west-coast-skateparks/#{state}/#{identifier}-01.jpg"
}

function addNearbyParkMarkers(map, skatepark, nearbyParks, infowindowPic) {
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
      addInfoWindow(map, park, marker, nearbyMarkers, infowindowPic);
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