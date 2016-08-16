$(document).ready(function() {
  $(".display-search").click(function() {
    $(this).hide();
    $(".react-search-container").animate({width:'toggle'});
  });
});