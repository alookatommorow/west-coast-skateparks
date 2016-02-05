$(document).ready(function() {

  $('.add-visit-button').on('submit', function(event){
    // AJAX.favoriteVisit('post', 'visit', event);
    AJAX['visit']['post'](event);
  });

  $('.remove-visit-button').on('submit', function(event){
    // AJAX.favoriteVisit('put', 'visit', event);
    AJAX['visit']['put'](event);
  });

});

