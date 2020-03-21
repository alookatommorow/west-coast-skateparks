var MAPBUILDER = (function () {
  var builder = {},
      gMap,
      map,
      markerContainer = [];

  // method for map creation
  builder.initialize = function() {
    this._initialSetUp();
    this.generateMarkers();
    this._setMapCenter();
    this._bindClickToVisibilityButtons();
    this._showButtons();
  };

  builder._initialSetUp = function() {
    var zoom = (this.skatepark ? 9 : 6);
    gMap = google.maps.Map;
    map = new gMap(document.getElementById('map'), { zoom: zoom });
    map.setOptions({styles: mapStyles});

    // these variables remain unchanged for every instance of Marker/InfoWindow objects,
    // assigning them to its prototype ensures that they are only created once.
    Marker.prototype.map = map;
    Marker.prototype.gMapsMarker = google.maps.Marker;
    InfoWindow.prototype.gMapsInfoWindow = google.maps.InfoWindow;
  };

  // sets map center to main skatepark, or first skatepark associated with user, or SF
  builder._setMapCenter = function () {
    var skatepark = this.skatepark,
        SANFRAN = [37.7749, -122.4194],
        mapCenter;

    if (skatepark) {
      mapCenter = {lat: skatepark.latitude, lng: skatepark.longitude};
    } else if (markerContainer[0] !== undefined) {
      mapCenter = markerContainer[0].position;
    } else {
      mapCenter = {lat: SANFRAN[0], lng: SANFRAN[1]};
    }

    map.setCenter(mapCenter);
  };

  // binds click so buttons toggle visibility of corresponding markers e.g., "Hide Favorites"
  builder._bindClickToVisibilityButtons = function () {
    var categorizedMarkers = this.categorizedMarkers,
        categories = Object.keys(categorizedMarkers);

    categories.forEach(function (category) {
      var buttonId = "#toggle-" + category;
      $('#skatepark-map').on('click', buttonId, function (event) {
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
    var marker = new Marker(skatepark);
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
    var marker = markerContainer.deleteById(skateparkId),
        markersInCategory = this.categorizedMarkers[marker.category];

    marker.setMap(null);
    markersInCategory.deleteById(skateparkId);

    if (markersInCategory.length < 1) {
      this._hideButton(marker.category);
    }
  };

  return builder;
}());
