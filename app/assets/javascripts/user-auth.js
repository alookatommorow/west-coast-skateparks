$(document).ready(function () {

  initGoogleAuth();

  //////// sign-in/sign-up validation ////////
  $(".auth-form").submit(function(event) {
    var validation = new FormValidator(this).validateForm();
    if (validation) {
      return true;
    } else {
      event.preventDefault();
    }
  });

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
    $(".session-form-container").hide();
  }
});
