$(document).ready(function(){

  var appendSkateparksToState = function (response) {
    $(".parks-container").children().remove();
    $(".parks-container").append(response);
  };

  //////// Show skateparks by state ////////
  $("a[data-state-link]").on("click", function(event){
    event.preventDefault();
    if ($(this).hasClass("active")) {
      return;
    }
    $(".active").removeClass("active");
    $(this).addClass("active");
    $.get($(this).attr("href"), appendSkateparksToState);
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on("click", ".item", function(){
    makeItemClickable(this);
  });
});

