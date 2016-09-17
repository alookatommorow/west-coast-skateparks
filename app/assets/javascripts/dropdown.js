$(document).ready(function() {
  $(".dropdown, .dropdown.icon").click(function(event) {
    event.stopPropagation();
    $(".dropdown").addClass("active").children(".menu").show();
  });

  $(document).click(function() {
    $(".dropdown").removeClass("active").children(".menu").hide();
  });

  $(".dropdown .menu .item").click(function(event) {
    event.stopPropagation();
    var selectedVal = $(this).data("value");
    $(this).parent().siblings("input").val(selectedVal);
    $(".dropdown").removeClass("active").children(".menu").hide();
    $(this).parent().siblings(".text").removeClass("default").text(selectedVal);
  });
});