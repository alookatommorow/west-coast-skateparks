$(document).on('turbolinks:load', function() {
  if ($('.users.show').length) {
    initMap();
  }
});