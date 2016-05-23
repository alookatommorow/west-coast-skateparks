function initMap() {
  var location = window.location.href.split('/');
  var id = location.pop().split("?")[0];
  var resourceName = location.pop();
  $.ajax({
    url: '/'+resourceName+'/'+id+'/map'
  })
  .done(generateMap)
  .fail(function(response){
    console.log("error", response);
  });
}

