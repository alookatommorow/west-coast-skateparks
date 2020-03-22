$(document).on('turbolinks:load', function() {
  if ($('.sessions.new').length || $('.users.new').length) {
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
      initGoogleAuth();
      hideSessionForm();
    });

    function hideSessionForm() {
      $(".dimmer").addClass("active");
      $(".session-form-container").hide();
    }
  }
});

function sendUserData(response) {
  $.ajax({
    url: '/vendor/sessions',
    data: response,
    method: 'post'
  })
  .done(function(response){
    if (isNaN(response)) {
      $('#session-modal').modal('hide');
      $('#flashes').remove();
      $('body').append(response);
      displayFlashMessage();
    } else {
      window.location = '/users/'+response+'?from_vendor=true';
    }
  })
  .fail(function(response){
    console.log(response);
  });
}
