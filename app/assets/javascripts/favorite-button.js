$(document).ready(function() {

  $('.add-favorite-button').on('submit', function(event){
    AJAX['favorite']['post'](event);
  });

  $('.remove-favorite-button').on('submit', function(event){
    AJAX['favorite']['put'](event);
  });

});

