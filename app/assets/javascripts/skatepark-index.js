$(document).ready(function(){


  //////// Show skateparks by state ////////
  $(".park-state").on('click', function(event){
    event.preventDefault();
    slideUpImages();
    var url = $(this).attr('href');
    $(this).addClass('active').siblings().removeClass('active');
    $.ajax({url: url})
    .done(function(response) {
      $(".parks-container").children().remove();
      $(".parks-container").append(response)
    })
    .fail(function(response){
      console.error(response)
    })
  });

  //////// Select Skatepark From State List ////////
  $(".parks-container").on('click', '.item', function(){
    window.location = $(this).find("a").attr("href");
    return false;
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


});

function slideUpImages(){
  $('.image-rotator').slideUp('slow', function(){
    clearInterval(rotationTimer);
  });
}