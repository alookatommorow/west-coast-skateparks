function generateMap(response) {
  var mapCenter = {lat: response.mapCenter[0], lng: response.mapCenter[1]};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: response.zoom,
    center: mapCenter
  });

  new MarkerGenerator(map, response.skateparks).generateMarkers().showButtons();
}