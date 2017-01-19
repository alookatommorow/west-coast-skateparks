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
  if (response.email) {
    configureMapBuilderForUserPage(response);
  } else {
    configureMapBuilderForSkateparkPage(response);
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
  }
}
