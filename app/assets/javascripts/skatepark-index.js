$(document).ready(function(){
  var rotator = new ImageRotator();
  var rotationTimer = setInterval(rotator.cycleImages, 4000);

  //////// Show skateparks by state ////////
  $(".park-state").on('click', function(event){
    var $stateButton = $(event.target);

    if ($stateButton.hasClass('active')) {
      event.preventDefault();
      $stateButton.removeClass('active');
      slideDownImages();
    } else {
      AJAX.state(event);
      slideUpImages();
    }
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on('click', '.item', function(){
    makeItemClickable(this);
  });

  function slideUpImages(){
    clearInterval(rotationTimer);
    $('.image-rotator').stop().slideUp('slow', function(){
      $(this).animate({opacity:'100'});
    });
  }

  function slideDownImages() {
    rotationTimer = setInterval(rotator.cycleImages, 4000);
    $('.image-rotator').slideDown('slow', function(){
      $('.parks-container').children().remove();
    });
  }
});

