function UserMap(google, user) {
  DefaultMap.call(this, google);

  this.user = user;
  this.zoom = 6;
  this.categorizedMarkers = {favorite: [], visited: [], both: []};

  this.generateMarkers = function() {
    var user = this.user,
    createSkateparkMarker = this.createSkateparkMarker.bind(this),
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
          createSkateparkMarker(skatepark);
        }
      }
    }
  };

  this.setMapCenter = function() {
    var map = this.map,
    marker;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        marker = createUserMarker(position);

        map.setCenter(marker.position);
      }, handleNoLocation.bind(this));
    } else {
      handleNoLocation.bind(this)();
    }

    function createUserMarker(position) {
      return new Marker({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        category: "user"
      });
    }

    function handleNoLocation() {
      var SANFRAN = {lat: 37.7749, lng: -122.4194},
      markers = this.markers,
      userHasSavedParks = (markers[0] !== undefined);

      if (userHasSavedParks) {
        map.setCenter(markers[0].position) // set to first saved park
      } else {
        map.setCenter(SANFRAN); // set to SF
      }
    }
  };
}
