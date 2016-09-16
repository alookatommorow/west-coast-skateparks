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

  function hideSessionForm() {
    $(".ui.dimmer").addClass("active");
    $(".sign-in-form").hide();
    $(".sign-up-form").hide();
  }
});
