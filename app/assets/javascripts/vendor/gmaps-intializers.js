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
  .done(generateMap)
  .fail(function(response){
    console.log("error", response);
  });
}

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

