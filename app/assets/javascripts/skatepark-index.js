$(document).ready(function(){


  //////// Show skateparks by state ////////
  $(".park-state").on('click', function(event){
    var $stateButton = $(this);
    event.preventDefault();
    if ($stateButton.hasClass('active')) {
      $stateButton.removeClass('active');
      return slideDownImages();
    }
    slideUpImages();
    var url = $stateButton.attr('href');
    $stateButton.addClass('active').siblings().removeClass('active');
    $.ajax({url: url})
    .done(function(response) {
      $(".parks-container").children().remove();
      $(".parks-container").append(response);
    })
    .fail(function(response){
      console.error(response);
    })
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on('click', '.item', function(){
    makeItemClickable(this);
  });

  //// image rotation ////
  var $container = $('.image-rotator');
  var imageUrls = ['lance-mountain', 'hewitt', 'willis', 'beckett', 'kowalski', 'drehobl', 'robbie', 'ronnie', 'flower-shop'];
  var currentUrl = 0;

  function animate(string) {
    $container.fadeOut(1500, function() {
      $container.css('background-image',"url('https://storage.googleapis.com/west-coast-skateparks/headers/"+string+".jpg')");
      $container.fadeIn(1500);
    });
  }

  function cycleImages() {
    currentUrl++;
    if (currentUrl == imageUrls.length - 1) {
      currentUrl = 0;
    }
    animate(imageUrls[currentUrl]);
  }

  var rotationTimer = setInterval(cycleImages, 4000);

  function slideUpImages(){
    clearInterval(rotationTimer);
    $('.image-rotator').stop().slideUp('slow', function(){
      $(this).animate({opacity:'100'});
    });
  }

  function slideDownImages() {
    rotationTimer = setInterval(cycleImages, 4000);
    $('.image-rotator').slideDown('slow', function(){
      $('.parks-container').children().remove();
    });
  }

});

