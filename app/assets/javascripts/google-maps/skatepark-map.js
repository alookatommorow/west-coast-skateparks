function SkateparkMap(google, mainSkatepark) {
  DefaultMap.call(this, google);

  this.mainSkatepark = mainSkatepark;
  this.zoom = 9;
  this.categorizedMarkers = {main: [], nearby: []};

  this.generateMarkers = function() {
    var mainSkatepark = this.mainSkatepark,
        createSkateparkMarker = this.createSkateparkMarker.bind(this);

    mainSkatepark.category = "main";
    createSkateparkMarker(mainSkatepark);

    mainSkatepark.neighbor_parks.forEach(function (skatepark) {
      skatepark.category = "nearby";
      createSkateparkMarker(skatepark);
    });
  };

  this.setMapCenter = function () {
    var mainSkatepark = this.mainSkatepark,
        map = this.map;

    map.setCenter({ lat: mainSkatepark.latitude, lng: mainSkatepark.longitude });
  };
}
