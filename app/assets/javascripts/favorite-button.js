$(document).ready(function() {

  $('.add-favorite-button').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({ url: url, data: data, method: 'post' })
    .done(function(response){
      $('.remove-favorite-button').removeClass('hidden');
      $('.add-favorite-button').addClass('hidden');
    })
    .fail(function(response){
      console.log(response);
    });
  });

  $('.remove-favorite-button').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({ url: url, data: data, method: 'put' })
    .done(function(response){
      $('.remove-favorite-button').addClass('hidden');
      $('.add-favorite-button').removeClass('hidden');
    })
    .fail(function(response){
      console.log(response);
    });
  });

});

