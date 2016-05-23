var alreadyInitializedMap = false;

$("[data-dashboard-link]").click(function (event) {
  $(".selected").removeClass("selected");
  $(this).addClass("selected");
  $("[data-toggle-container]").hide();
  $($(this).data("dashboard-link")).show();

  event.preventDefault();

  if ($(this).data("dashboard-link") === "#skatepark-map" && !alreadyInitializedMap) {
    alreadyInitializedMap = true;
    initMap();
  }

  // event.preventDefault();
});

function resizeMap() {
  var map = document.getElementById('map')
  google.maps.event.trigger(map, 'resize');
}