function initMap() {
  var location = window.location.href.split('/'),
      id = location.pop().split("?")[0],
      resourceName = location.pop();

  $.get('/'+resourceName+'/'+id+'/map').
    done(generateMap).
    fail(function(response){
      console.log("error", response);
    });
}


function generateMap(response) {
  var MAPBUILDER = (function () {
    var builder = {},
        gMap = google.maps.Map, // declare gMaps dependencies at top of module
        gMapMarker = google.maps.Marker,
        map = new gMap(document.getElementById('map'), { zoom: response.zoom }),
        markerContainer = [];

    map.setOptions({styles: mapStyles});

    // sets map center to main skatepark, or first skatepark associated with user
    builder._setMapCenter = function () {
      var skatepark = this.skatepark;

      if (skatepark) {
        map.setCenter({ lat: skatepark.latitude, lng: skatepark.longitude });
      } else {
        map.setCenter(markerContainer[0].position);
      }
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
          $('#toggle-'+category+'-container').removeClass('hidden').addClass('inline-block');
        }
      }
    };

    // create map marker out of skatepark argument
    builder.createMarker = function(skatepark) {
      var markerColors = this.markerColors,
          marker = new gMapMarker({
            position: { lat: skatepark.latitude, lng: skatepark.longitude },
            // refactor infowindowGenerator logic
            infowindow: new infowindowGenerator(skatepark).generateInfowindow(),
            map: map,
            title: titleize(skatepark.city + ', ' + stateDisplay[skatepark.state]),
            main: (skatepark.category === "main"),
            icon: "https://maps.google.com/mapfiles/ms/icons/" + markerColors[skatepark.category] + ".png"
          });

      if (skatepark.category === "nearby") {
        marker.setVisible(false);
      }
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

    // Method for map creation
    builder.initialize = function() {
      this.generateMarkers();
      this._setMapCenter(); // _underscore prefix means method is private
      this._bindClickToVisibilityButtons();
      this._showButtons();
    };

    return builder;
  }());




  // Add attributes and methods to MAPBUILDER for SKATEPARK PAGE
  if (response.skatepark) {
    MAPBUILDER.skatepark = response.skatepark;
    MAPBUILDER.categorizedMarkers = {main: [], nearby: []};
    MAPBUILDER.markerColors = {main: "red-dot", nearby: "green-dot"};
    MAPBUILDER.generateMarkers = function () {
      var skatepark = this.skatepark,
          createMarker = this.createMarker.bind(this);

      skatepark.category = "main";
      createMarker(skatepark);

      skatepark.neighbor_parks.forEach(function (nearbyPark) {
        nearbyPark.category = "nearby";
        createMarker(nearbyPark);
      });
    };
  }

  // Add attributes and methods to MAPBUILDER for USER PAGE
  else if (response.user) {
    MAPBUILDER.user = response.user;
    MAPBUILDER.categorizedMarkers = {favorite: [], visited: [], both: []};
    MAPBUILDER.markerColors = {favorite: 'purple-dot', visited: 'yellow-dot', both: 'blue-dot'};
    MAPBUILDER.generateMarkers = function () {
      var user = this.user,
          createMarker = this.createMarker.bind(this);

      user.favorite_parks.forEach(function (skatepark) {
        skatepark.category = "favorite";
        createMarker(skatepark);
      });

      user.visited_parks.forEach(function (skatepark) {
        skatepark.category = "visited";
        createMarker(skatepark);
      });

      user.dups.forEach(function (skatepark) {
        skatepark.category = "both";
        createMarker(skatepark);
      });
    };
  }

  // Initialize Map
  MAPBUILDER.initialize();
}
