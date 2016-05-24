var alreadyInitializedMap = false;

$("[data-dashboard-link]").click(function (event) {
  $(".selected").removeClass("selected");
  $(this).addClass("selected");
  $("[data-toggle-container]").hide();
  $($(this).data("dashboard-link")).show();

  event.preventDefault();

  if ($(this).data("dashboard-link") === "#skatepark-map" && !alreadyInitializedMap) {
    alreadyInitializedMap = true;
    initMap();
  }
});

$(document).ready(function() {

  var currentIndex = 0,
      $photos = $('.carousel-image-container div'),
      lastIndex = $photos.length - 1,
      $thumbs = $(".skatepark-show-thumbnail");

  $photos.eq(currentIndex).show();
  $thumbs.first().children().addClass("selected");

  function selectNextThumb(next) {
    $(".selected").removeClass("selected");
    next.addClass("selected")
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
});
