$(document).ready(function() {

  function visitAjax(method, event) {
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('action'),
      data: $(event.target).serialize(),
      method: method,
    })
    .done(function(response) {
      if (method === 'post') {
        displayRemoveVisitButton();
      } else {
        displayAddVisitButton();
      }
    })
    .fail(function(response){
      console.log(response);
    });
  }

  function displayRemoveVisitButton() {
    $('.remove-visit-button').removeClass('hidden');
    $('.add-visit-button').addClass('hidden');
    $('.opinions-container').removeClass('hidden');
  }

  function displayAddVisitButton() {
    $('.remove-visit-button').addClass('hidden');
    $('.add-visit-button').removeClass('hidden');
    $('.opinions-container').addClass('hidden');
  }

  $('.add-visit-button').on('submit', function(event){
    visitAjax('post', event);
  });

  $('.remove-visit-button').on('submit', function(event){
    visitAjax('put', event);
  });

});

