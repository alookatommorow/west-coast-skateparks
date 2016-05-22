$(document).ready(function () {
  initGoogleAuth();

  //////// FB login ////////
  $('#fb-login').click(function(){
    hideSessionForm();
    FB.login(checkLoginState);
  });

  //////// Goog login ////////
  $('#goog-login').click(function(){
    hideSessionForm();
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

  function hideSessionForm() {
    $(".ui.dimmer").addClass("active");
    $(".sign-in-form").hide();
    $(".sign-up-form").hide();
  }
});
