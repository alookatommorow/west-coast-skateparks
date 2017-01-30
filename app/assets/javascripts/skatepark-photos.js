$(document).ready(function() {

  var currentIndex = 0,
      $photos = $('.carousel-image-container div'),
      lastIndex = $photos.length - 1,
      $thumbs = $(".skatepark-show-thumbnail");

  $photos.eq(currentIndex).show();
  $thumbs.first().children().addClass("active-photo");

  function selectNextThumb(next) {
    $(".active-photo").removeClass("active-photo");
    next.addClass("active-photo");
  }

  function showNext() {
    var $currentPhoto = $photos.eq(currentIndex);
    var $nextThumb = $thumbs.eq(currentIndex + 1).children();
    if (currentIndex === lastIndex) {
      $currentPhoto.hide();
      $photos.first().show();
      selectNextThumb($thumbs.first().children());
      currentIndex = 0;
    } else {
      $currentPhoto.hide();
      $currentPhoto.next().show();
      selectNextThumb($nextThumb);
      currentIndex++;
    }
  }

  function showPrev() {
    var $currentPhoto = $photos.eq(currentIndex),
        $nextThumb = $thumbs.eq(currentIndex - 1).children();
    if (currentIndex === 0) {
      $currentPhoto.hide();
      $photos.last().show();
      selectNextThumb($nextThumb);
      currentIndex = lastIndex;
    } else {
      $currentPhoto.hide();
      $currentPhoto.prev().show();
      selectNextThumb($nextThumb);
      currentIndex--;
    }
  }

  $(".carousel-button").click(function(){
    if ($(this).data("carousel") === "prev") {
      showPrev();
    } else {
      showNext();
    }
  });

  $('.skatepark-show-image').click(function() {
    showNext();
  });

  $('.skatepark-show-thumbnail').click(function() {
    nextIndex = $(this).index();
    var $currentPhoto = $photos.eq(currentIndex);
    $currentPhoto.hide();
    $photos.eq(nextIndex).show();
    selectNextThumb($thumbs.eq(nextIndex).children());
    currentIndex = nextIndex;
  });

  //key navigation logic
  $(document).on('keydown', function(event) {
    if (!$("#react-search-input").is(":focus") && $("[data-dashboard-link='#skatepark-photos']").hasClass("selected") ) {
      event = event || window.event;
      switch(event.which || event.keyCode) {
        case 37: // left
          showPrev();
        break;

        case 39: //right
          showNext();
        break;

        default: return; // exit this handler for other keys
      }
    }
  });
});
