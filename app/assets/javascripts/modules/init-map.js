function initMap() {
  var location = window.location.href.split('/');
  var id = location.pop();
  var resourceName = location.pop();
  $.ajax({
    url: '/'+resourceName+'/'+id+'/map_data'
  })
  .done(generateMarkers)
  .fail(function(response){
    console.log("error", response);
  });
}

var generateMarkers = function(response) {
  var mapCenter = {lat: response.mapCenter[0], lng: response.mapCenter[1]}

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: response.zoom,
    center: mapCenter
  });

  new MarkerGenerator(map, response.skateparks).generateMarkers().showButtons();
}