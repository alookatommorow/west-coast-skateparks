$(document).ready(function() {

  $('.add-visit-button').on('submit', function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var data = $(this).serialize();
    $.ajax({ url: url, data: data, method: 'post' })
    .done(function(response){
      console.log("bitch");
    })
    .fail(function(response){
      console.log(response);
    });
  });




});

