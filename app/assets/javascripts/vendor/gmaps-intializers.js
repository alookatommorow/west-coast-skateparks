function initAll() {
  initMap();
  initAutocomplete();
}

function initMap() {
  var location = window.location.href.split('/');
  var id = location.pop().split("?")[0];
  var resourceName = location.pop();
  $.ajax({
    url: '/'+resourceName+'/'+id+'/map'
  })
  .done(generateMarkers)
  .fail(function(response){
    console.log("error", response);
  });
}

var generateMarkers = function(response) {
  var mapCenter = {lat: response.mapCenter[0], lng: response.mapCenter[1]};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: response.zoom,
    center: mapCenter
  });

  new MarkerGenerator(map, response.skateparks).generateMarkers().showButtons();
};


//// Map Autocomplete ////

var autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'), {types: ['geocode']});
}

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}

