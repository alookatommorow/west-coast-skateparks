$(document).ready(function(){

  var appendSkateparksToState = function (response) {
    $(".parks-container").html(response);
  };

  //////// Show skateparks by state ////////
  $("a[data-state-link]").on("click", function(event){
    event.preventDefault();
    console.log(this)
    if ($(this).hasClass("active")) {
      return;
    } else if ($(this).hasClass("mobile-menu")) {
      $(".index-menu-container").slideUp();
    }
    $(".active").removeClass("active");
    $(this).addClass("active");
    $.get(this.href, appendSkateparksToState);
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on("click", ".item", function(){
    makeItemClickable(this);
  });

  /////// Show skatepark by Letter ////////
  $(".parks-container").on("click", "a[data-skatepark-letter-link]", function(event) {
    event.preventDefault();
    $.get(this.href, appendSkateparksToState);
  });

  $(".parks-container").on("click", ".show-mobile-menu", function(){
    $(".index-menu-container").slideDown();
  });

});

