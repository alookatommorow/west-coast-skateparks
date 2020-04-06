$(document).on('turbolinks:load', function () {
  if ($('.users.show').length || $('.skateparks.show').length) {
    console.log('initting a hoe')
    initMap();

  }
});