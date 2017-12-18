var MAPBUILDER = (function ($) {
  var builder = {
    markerContainer: [],
    categorizedMarkers: {main: [], nearby: []}
  };

  // method for map creation
  builder.initialize = function() {
    this._initialSetUp();
    this.generateMarkers(); // no _ because these two "public" methods can be stubbed
    this.setMapCenter();    // to build maps for users as well as skateparks
    this._bindClickToVisibilityButtons();
    this._showButtons();
  };

  builder._initialSetUp = function() {
    var zoom = (this.skatepark ? 9 : 6),
        googleMaps = google.maps;
        gMap = googleMaps.Map;
        map = new gMap(document.getElementById('map'), { zoom: zoom });

    map.setOptions({styles: mapStyles});

    // these variables remain unchanged for every instance of Marker/InfoWindow objects,
    // assigning them to its prototype ensures that they are only created once.
    Marker.prototype.map = map;
    Marker.prototype.gMapsMarker = googleMaps.Marker;
    InfoWindow.prototype.gMapsInfoWindow = googleMaps.InfoWindow;

    // map must be exposed to outside in order to tweak on user page
    this.map = map
  };

  builder.generateMarkers = function() {
    var skatepark = this.skatepark,
        createMarker = this.createMarker.bind(this);

    skatepark.category = "main";
    createMarker(skatepark);

    skatepark.neighbor_parks.forEach(function (nearbyPark) {
      nearbyPark.category = "nearby";
      createMarker(nearbyPark);
    });
  };

  builder.setMapCenter = function () {
    var skatepark = this.skatepark,
        map = this.map;

    map.setCenter({ lat: skatepark.latitude, lng: skatepark.longitude });
  };

  // binds click so buttons toggle visibility of corresponding markers e.g., "Hide Favorites"
  builder._bindClickToVisibilityButtons = function () {
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
  builder._showButtons = function () {
    var categorizedMarkers = this.categorizedMarkers;
    for (var category in categorizedMarkers) {
      if (categorizedMarkers[category].length > 0) {
        $("#toggle-"+category+"-container").show();
      }
    }
  };

  builder._hideButton = function(category) {
    $("#toggle-"+category+"-container").hide();
  };

  // create map marker out of skatepark argument
  builder.createMarker = function(skatepark) {
    var map = this.map,
        marker = new Marker(skatepark),
        markerContainer = this.markerContainer;

    markerContainer.push(marker);
    this.categorizedMarkers[skatepark.category].push(marker);
    bindInfoWindowClick(marker);

    function bindInfoWindowClick(marker) {
      marker.addListener('click', function() {
        markerContainer.forEach(function(marker) {
          marker.infowindow.close();
        });
        marker.infowindow.open(map, marker);
      });
    }
  };

  builder.removeMarker = function(skateparkId) {
    var markerContainer = this.markerContainer,
        marker = markerContainer.deleteById(skateparkId),
        markersInCategory = this.categorizedMarkers[marker.category];

    marker.setMap(null);
    markersInCategory.deleteById(skateparkId);

    if (markersInCategory.length < 1) {
      this._hideButton(marker.category);
    }
  };

  return builder;
}(jQuery));
