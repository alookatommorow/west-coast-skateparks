// wrapper around google maps Marker to add our custom setup
// while exposing a simple constructor to the MAPBUILDER
function Marker(skatepark) {
  var marker = new this.gMapsMarker({
    position: { lat: skatepark.latitude, lng: skatepark.longitude },
    infowindow: new InfoWindow(skatepark),
    map: this.map,
    title: titleize(skatepark.city + ', ' + stateDisplay[skatepark.state]),
    main: (skatepark.category === "main"),
    icon: "https://maps.google.com/mapfiles/ms/icons/" + this.colorOptions[skatepark.category] + ".png"
  });

  if (skatepark.category === "nearby") {
    marker.setVisible(false);
  }

  return marker;
}

Marker.prototype.colorOptions = {
  main: "red-dot",
  nearby: "green-dot",
  favorite: "purple-dot",
  visited: "yellow-dot",
  both: "blue-dot"
};
