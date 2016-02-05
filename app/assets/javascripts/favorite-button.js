$(document).ready(function() {

  $('.add-favorite-button').on('submit', function(event){
    // AJAX.favoriteVisit('post', 'favorite', event);
    AJAX['favorite']['post'](event);

  });

  $('.remove-favorite-button').on('submit', function(event){
    // AJAX.favoriteVisit('put', 'favorite', event);
    AJAX['favorite']['put'](event);

  });

});

