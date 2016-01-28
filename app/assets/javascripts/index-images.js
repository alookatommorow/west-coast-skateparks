function cycleImages(){
    var $active = $('.image-rotator .active');
    var $next = ($active.next().length > 0) ? $active.next() : $('.image-rotator img:first');
    $active.fadeOut(1500,function(){
      $active.removeClass('active');
      $next.fadeIn(1500).addClass('active');
  });
}

$(document).ready(function(){
// run every 7s
  setInterval('cycleImages()', 4000);
});
