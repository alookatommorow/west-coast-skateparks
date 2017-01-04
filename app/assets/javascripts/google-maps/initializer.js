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
        map = new gMap(document.getElementById('map'), { zoom: response.zoom }),
        markerContainer = [];

    map.setOptions({styles: mapStyles});

    // these variables remain unchanged for every instance of Marker/InfoWindow objects,
    // assigning them to its prototype ensures that they are only created once.
    Marker.prototype.map = map;
    Marker.prototype.gMapsMarker = google.maps.Marker;
    InfoWindow.prototype.gMapsInfoWindow = google.maps.InfoWindow;

    // method for map creation
    builder.initialize = function() {
      this.generateMarkers();
      this._setMapCenter(); // _underscore prefix == private method
      this._bindClickToVisibilityButtons();
      this._showButtons();
    };

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

    return builder;
  }());


  if (response.skatepark) {
    configureMapBuilderForSkateparkPage(response.skatepark);
  } else if (response.user) {
    configureMapBuilderForUserPage(response.user);
  }

  // initialize map
  MAPBUILDER.initialize();


  // add attributes and methods to MAPBUILDER for SKATEPARK PAGE
  function configureMapBuilderForSkateparkPage(skatepark) {
    MAPBUILDER.skatepark = skatepark;
    MAPBUILDER.categorizedMarkers = {main: [], nearby: []};
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

  // add attributes and methods to MAPBUILDER for USER PAGE
  function configureMapBuilderForUserPage(user) {
    MAPBUILDER.user = user;
    MAPBUILDER.categorizedMarkers = {favorite: [], visited: [], both: []};
    MAPBUILDER.generateMarkers = function () {
      var user = this.user,
          createMarker = this.createMarker.bind(this),
          userSkateparks = {
            favorite: user.favorite_parks,
            visited: user.visited_parks,
            both: user.dups
          };

      for (var category in userSkateparks) {
        if ({}.hasOwnProperty.call(userSkateparks, category)) { // codeclimate recommendation
          var skateparks = userSkateparks[category];

          for (var i = 0, max = skateparks.length; i < max; i++) {
            var skatepark = skateparks[i];
            skatepark.category = category;
            createMarker(skatepark);
          }
        }
      }
    };
  }
}
