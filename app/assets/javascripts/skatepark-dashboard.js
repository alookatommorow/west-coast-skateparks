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
    item = $('.photo-carousel div').eq(currentIndex),
    items = $('.photo-carousel div'),
    itemAmt = items.length,
    thumbs = $(".skatepark-show-thumbnail");

  item.show();
  thumbs.first().children().addClass("selected");

  $(".prev").click(function(){
    var item = $('.photo-carousel div').eq(currentIndex),
        prevItem = $('.photo-carousel div').eq(currentIndex - 1)
        prevThumb = $(".skatepark-show-thumbnail").eq(currentIndex-1).children()
    if (currentIndex === 0) {
      item.hide();
      items.last().show();
      currentIndex = itemAmt - 1;
    } else {
      item.hide();
      item.prev().show();
      currentIndex--;
    }
  });

  $(".next").click(function(){
    var item = $('.photo-carousel div').eq(currentIndex);
    if (currentIndex === itemAmt - 1) {
      item.hide();
      items.first().show();
      currentIndex = 0;
    } else {
      debugger
      item.hide();
      item.next().show();
      currentIndex++;
    }
  });
});
