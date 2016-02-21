$(document).ready(function () {
  //////// Show sign-up modal ////////
  $('.session-button').click(function(){
    $('#session-modal').modal('show');
  });

  //////// FB login ////////

  $('#fb-login').click(function(){
    FB.login(checkLoginState);
  })

  $('.sign-up-button').click(function(){
    toggleVisibility({hide: $('.log-in-form'), show: $('.sign-up-form')})
  })

  $('.log-in-button').click(function(){
    toggleVisibility({hide: $('.sign-up-form'), show: $('.log-in-form')})
  })

  //////// Show modal on picture click ////////
  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });

});