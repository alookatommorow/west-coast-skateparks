$(document).on('turbolinks:load', function () {
  if ($('.users.show').length || $('.skateparks.show').length) {
    initMap();
  }
});