$("[data-dashboard-links] a").click(function (event) {
  $(".selected").removeClass("selected");
  $(this).addClass("selected");

  event.preventDefault();
});
