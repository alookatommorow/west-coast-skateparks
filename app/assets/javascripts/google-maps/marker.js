// wrapper around google maps Marker to add our custom setup
// while exposing a simple constructor to the MAPBUILDER
function Marker(object) {
  var map = this.map;
      colors = this.colors,
      marker = new this.gMapsMarker({
        position: {lat: object.latitude, lng: object.longitude},
        infowindow: new InfoWindow(object),
        map: map,
        category: object.category,
        icon: "https://maps.google.com/mapfiles/ms/icons/" + colors[object.category] + ".png"
      });

  if (object.id) { // skatepark
    var skatepark = object;

    marker.title = titleize(skatepark.city + ', ' + stateDisplay[skatepark.state]);
    marker.id = skatepark.id;

    if (skatepark.category === "nearby") {
      marker.setVisible(false);
    }
  } else { // user
    marker.addListener('click', function() {
      marker.infowindow.open(map, marker);
    });
  }

  return marker;
}

Marker.prototype.colors = {
  main: "red-dot",
  nearby: "green-dot",
  favorite: "purple-dot",
  visited: "yellow-dot",
  both: "blue-dot",
  user: "orange-dot"
};
