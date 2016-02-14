function MarkerGenerator(map, skateparks) {
  var types = Object.keys(skateparks);
  var legend = { favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot', nearby: 'green-dot', main: 'red-dot' };
  var toggleable = { favorite: [], visited: [], both: [], nearby: [], main: [] };
  var allMarkers = [];

  this.generateMarkers = function () {
    types.forEach(function(type) {
      skateparks[type].forEach(function (skatepark) {
        var marker = createMarker(skatepark, type);
        var infowindow = marker.infowindow;
        toggleable[type].push(marker);
      });
      bindVisibilityListener(type);
    });
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
    } else if (type === 'nearby') {
      marker.setVisible(false);
    }
    toggleable[type].push(marker);
    bindInfowindowListener(map, allMarkers, marker, infowindow);
    allMarkers.push(marker);
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

  function bindInfowindowListener(map, allMarkers, marker, infowindow) {
    marker.addListener('click', function() {
      allMarkers.forEach(function(marker){
        marker.infowindow.close();
      });
      infowindow.open(map, marker);
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

  function generateContentString(skatepark) {
    // id='content' is a Google Maps requirement
    return "<div id='content'><div class='center-text'><img style='height:50px' src='"+skatepark.firstPicture+ "' ></div><strong><a href='/skateparks/"+skatepark.id+"'>"+titleize(skatepark.name)+"</a></strong></div>";
  }

  function titleize(string) {
    return string.split(' ').map(function(word){
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

}
