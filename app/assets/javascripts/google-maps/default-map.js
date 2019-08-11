function DefaultMap(google) {
  this.google = google;
  this.markers = [];

  // not using prototype because it makes it hard to encapsulate logic of
  // private methods like `_assignMapToPrototypes`, and we won't be instantiating
  // a ton of map objects, so we shouldn't see any performance hit
  this.initialize = function() {
      var domMap = document.getElementById("map"),
          google = this.google,
          zoom = this.zoom,
          map;

      this.map = new google.maps.Map(domMap, {zoom: zoom}); // possibly prototype?
      map = this.map;
      map.setOptions({styles: mapStyles});

      _assignMapToPrototypes.bind(this)();
      this.generateMarkers();
      this.setMapCenter();
      _bindClickToVisibilityButtons.bind(this)();
      _showButtons.bind(this)();
  };

  this.createSkateparkMarker = function(skatepark) {
    var map = this.map,
        marker = new Marker(skatepark),
        markers = this.markers;

    markers.push(marker);
    this.categorizedMarkers[skatepark.category].push(marker);
    bindInfoWindowClick(marker);

    function bindInfoWindowClick(marker) {
      marker.addListener('click', function() {
        markers.forEach(function(marker) {
          marker.infowindow.close();
        });
        marker.infowindow.open(map, marker);
      });
    }
  };

  function _assignMapToPrototypes() {
    var map = this.map;
    // these variables remain unchanged for every instance of Marker/InfoWindow objects,
    // assigning them to its prototype ensures that they are only created once.
    Marker.prototype.map = map;
    Marker.prototype.gMapsMarker = google.maps.Marker;
    InfoWindow.prototype.gMapsInfoWindow = google.maps.InfoWindow;
  }

  function _bindClickToVisibilityButtons() {
    var categorizedMarkers = this.categorizedMarkers,
        categories = Object.keys(categorizedMarkers);

    categories.forEach(function (category) {
      var buttonId = "#toggle-" + category;

      $(document).on('click', buttonId, function (event) {
        var $button = $(event.target),
            action = $button.text().split(' ');

        toggleMarkerVisibility(categorizedMarkers[category], action[0]);
        toggleButtonText($button, action);
      });
    });

    function toggleMarkerVisibility(markers, visibility) {
      visibility = (visibility === 'Hide') ? false : true;
      markers.forEach(function (marker) {
        marker.infowindow.close();
        marker.setVisible(visibility);
      });
    }

    function toggleButtonText(button, action) {
      action[0] = (action[0] === 'Hide') ? 'Show' : 'Hide';
      button.text(action.join(' '));
    }
  };

  // show visibility toggle buttons
  function _showButtons() {
    var categorizedMarkers = this.categorizedMarkers;
    for (var category in categorizedMarkers) {
      if (categorizedMarkers[category].length > 0) {
        $("#toggle-"+category+"-container").show();
      }
    }
  };
}
