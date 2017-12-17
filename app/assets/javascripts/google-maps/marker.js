// wrapper around google maps Marker to add our custom setup
// while exposing a simple constructor to the MAPBUILDER
function Marker(object) {
  var marker,
      map = this.map;
      gMarker = this.gMapsMarker,
      colorOptions = this.colorOptions;

  if (object.id) {
    return generateSkateparkMarker(object);
  } else {
    return generateUserMarker(object);
  }

  function generateSkateparkMarker(skatepark) {
    var marker = new gMarker({
      position: { lat: skatepark.latitude, lng: skatepark.longitude },
      infowindow: new InfoWindow(skatepark),
      map: map,
      title: titleize(skatepark.city + ', ' + stateDisplay[skatepark.state]),
      category: skatepark.category,
      icon: "https://maps.google.com/mapfiles/ms/icons/" + colorOptions[skatepark.category] + ".png",
      id: skatepark.id
    });

    if (skatepark.category === "nearby") {
      marker.setVisible(false);
    }

    return marker;
  }

  function generateUserMarker(user) {
    var marker = new gMarker({
      position: {lat: user.latitude, lng: user.longitude},
      map: map,
      icon: "https://maps.google.com/mapfiles/ms/icons/"+colorOptions['user']+".png",
      infowindow: new InfoWindow(user)
    });

    marker.addListener('click', function() {
      marker.infowindow.open(map, marker);
    });

    return marker;
  }
}

Marker.prototype.colorOptions = {
  main: "red-dot",
  nearby: "green-dot",
  favorite: "purple-dot",
  visited: "yellow-dot",
  both: "blue-dot",
  user: "orange-dot"
};
