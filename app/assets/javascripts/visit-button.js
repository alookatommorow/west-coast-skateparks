$(document).ready(function() {

  $('.add-visit-button').on('submit', function(event){
    AJAX['visit']['post'](event);
  });

  $('.remove-visit-button').on('submit', function(event){
    AJAX['visit']['put'](event);
  });

});

