$(document).ready(function(){

  var appendSkateparksToState = function (response) {
    $(".parks-container").html(response);
  };

  //////// Show skateparks by state ////////
  $("a[data-state-link]").on("click", function(event){
    event.preventDefault();
    if ($(this).hasClass("active")) {
      return;
    }
    $(".active").removeClass("active");
    $(this).addClass("active");
    $.get(this.href, appendSkateparksToState);
  });

  //////// Show skateparks by state mobile ////////
  $("a[data-mobile-state-link]").on("click", function(event){
    event.preventDefault();
    if ($(this).hasClass("mobile-menu")) {
      $(".index-menu-container").slideUp();
    }
    $.get(this.href, appendSkateparksToState);
  });

  /////// Show skatepark by Letter ////////
  $(".parks-container").on("click", "a[data-skatepark-letter-link]", function(event) {
    event.preventDefault();
    $.get(this.href, appendSkateparksToState);
  });

  $(".parks-container").on("click", ".show-mobile-menu", function(){
    $(".parks-container").children().remove();
    $(".index-menu-container").slideDown();
  });
});

