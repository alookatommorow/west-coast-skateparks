
$(document).ready(function(){
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

  setInterval(cycleImages, 4000);

});
