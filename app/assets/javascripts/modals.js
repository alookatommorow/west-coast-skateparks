$(document).ready(function () {
  initGoogleAuth();

  //////// FB login ////////
  $('#fb-login').click(function(){
    FB.login(checkLoginState);
  });

  //////// Goog login ////////
  $('#goog-login').click(function(){
    googleSignIn();
  });

  //////// Toggle log-in/sign-up visibility ////////
  //using this over two separate functions cuz of Code Climate
  $('.sign-up-button, .log-in-button').click(function(){
    var $hide, $show;
    if ($(this).hasClass('sign-up-button')) {
      $hide = $('.log-in-form');
      $show = $('.sign-up-form');
    } else {
      $hide = $('.sign-up-form');
      $show = $('.log-in-form');
    }
    toggleVisibility({hide: $hide, show: $show});
  });

  //////// Show modal on picture click ////////
  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });

  // consolidate this when we refactor
  function toggleVisibility(legend) {
    legend.hide.addClass('hidden');
    legend.show.removeClass('hidden');
  }
});
