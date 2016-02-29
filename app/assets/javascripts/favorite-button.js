$(document).ready(function() {
  $('.add-favorite-button').on('submit', function(event){
    favoriteRequest($(event.target), $('.remove-favorite-button'));
  });

  $('.remove-favorite-button').on('submit', function(event){
    favoriteRequest($(event.target), $('.add-favorite-button'));
  });

  function favoriteRequest(hide, show) {
    AJAX(event, function () {
      toggleVisibility({ hide: hide, show: show });
    });
  }
});

