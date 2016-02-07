$(document).ready(function() {
  var showRemoveFavoriteBtn = function () {
    $('.remove-favorite-button').removeClass('hidden');
    $('.add-favorite-button').addClass('hidden');
  };
  var showAddFavoriteBtn = function () {
    $('.add-favorite-button').removeClass('hidden');
    $('.remove-favorite-button').addClass('hidden');
  };


  $('.add-favorite-button').on('submit', function(event){
    AJAX(event, 'post', showRemoveFavoriteBtn);
  });

  $('.remove-favorite-button').on('submit', function(event){
    AJAX(event, 'put', showAddFavoriteBtn);
  });
});

