function ImageRotator() {
  var $container = $('.image-rotator');
  var currentUrl = 0;
  var imageUrls = shuffle([
    'lance-mountain',
    'hewitt',
    'willis',
    'beckett',
    'foy',
    'childress',
    'kowalski',
    'drehobl',
    'robbie',
    'ronnie',
    'flower-shop'
  ]);


  function animate(url) {
    $container.fadeOut(1500, function() {
      $container.css('background-image', googleBucketUrlFrom(url));
      $container.fadeIn(1500);
    });
  }

  this.cycleImages = function () {
    currentUrl++;
    if (currentUrl === imageUrls.length - 1) {
      currentUrl = 0;
    }
    animate(imageUrls[currentUrl]);
  };

  function googleBucketUrlFrom(url) {
    return "url('https://storage.googleapis.com/west-coast-skateparks/headers/"+url+".jpg')";
  }

  // shuffles the array of image urls, so it doesn't always go in the same order
  // stole this off stack overflow
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
