$(document).ready(function() {

  $('.add-visit-button').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({ url: url, data: data, method: 'post' })
    .done(function(response){
      $('.remove-visit-button').removeClass('hidden');
      $('.add-visit-button').addClass('hidden');
      $('.opinions-container').removeClass('hidden');
    })
    .fail(function(response){
      console.log(response);
    });
  });

  $('.remove-visit-button').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({ url: url, data: data, method: 'put' })
    .done(function(response){
      $('.remove-visit-button').addClass('hidden');
      $('.add-visit-button').removeClass('hidden');
      $('.opinions-container').addClass('hidden');
    })
    .fail(function(response){
      console.log(response);
    });
  });




});

