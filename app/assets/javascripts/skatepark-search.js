$(document).on('turbolinks:load', function() {
  $(".display-search").click(function() {
    $(this).hide();
    $(".react-search-container").animate({width:'toggle'});
    $("#react-search-input").trigger("click").focus();
  });

  $("#react-search-input").focus(function() {
    $(".react-search-container i").fadeTo(100, 1);
  });

  $("#react-search-input").focusout(function() {
    $(".react-search-container i").fadeTo(100, 0.5);
  });
});