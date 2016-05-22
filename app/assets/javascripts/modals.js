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
