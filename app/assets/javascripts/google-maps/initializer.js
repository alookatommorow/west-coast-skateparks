function initMap() {
  var location = window.location.href.split('/'),
      id = location.pop().split("?")[0],
      resourceName = location.pop(),
      resourceUrl = "/maps/" + id + "?resource_name=" + resourceName;

  $.get(resourceUrl).
    done(generateMap).
    fail(function(response){
      console.log("error", response);
    });
}

function generateMap(response) {
  if (response["is_skatepark?"]) {
    MAPBUILDER.skatepark = response;
  } else {
    configureMapBuilderForUserPage(response);
  }

  // initialize map
  MAPBUILDER.initialize();

  // add attributes and methods to MAPBUILDER for USER PAGE
  function configureMapBuilderForUserPage(user) {
    MAPBUILDER.user = user;
    MAPBUILDER.categorizedMarkers = {favorite: [], visited: [], both: []};
    MAPBUILDER.generateMarkers = function () {
      var user = this.user,
          createMarker = this.createMarker.bind(this),
          userSkateparks = {
            favorite: user.favorites,
            visited: user.visits,
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

    MAPBUILDER.setMapCenter = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var marker = new Marker({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            category: "user"
          });

          map.setCenter(marker.position);
        }, handleNoLocation.bind(this));
      } else {
        handleNoLocation.bind(this)();
      }

      function handleNoLocation() {
        var SANFRAN = {lat: 37.7749, lng: -122.4194},
            markerContainer = this.markerContainer,
            userHasSavedParks = (markerContainer[0] !== undefined);

        if (userHasSavedParks) {
          map.setCenter(markerContainer[0].position) // set to first saved park
        } else {
          map.setCenter(SANFRAN); // set to SF
        }
      }
    };
  }
}
