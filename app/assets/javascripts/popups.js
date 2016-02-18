$(document).ready(function () {
  //////// Show sign-up modal ////////
  $('.sign-up-button').click(function(){
    $('#sign-up-modal').modal('show');
  });

  //////// Show modal on picture click ////////
  $('.ui.image').click(function(){
    $('.modal-image').attr('src', this.src);
    $('.picture-modal').modal('show');
  });

  $('.message .close').on('click', function() {
    $(this).closest('.message').transition('fade');
  });

  $('#flashes').transition('fly left');
});
