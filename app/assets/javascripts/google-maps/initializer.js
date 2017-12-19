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
    new SkateparkMap(google, response).initialize();
  } else {
    new UserMap(google, response).initialize();
  }
}
