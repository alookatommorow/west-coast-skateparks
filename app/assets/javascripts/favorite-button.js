$(document).ready(function() {
  $('.add-favorite-button').on('submit', function(event){
    favoriteRequest('post', $(event.target), $('.remove-favorite-button'));
  });

  $('.remove-favorite-button').on('submit', function(event){
    favoriteRequest('put', $(event.target), $('.add-favorite-button'));
  });

  function favoriteRequest(method, hide, show) {
    AJAX(event, method, function () {
      toggleVisibility({ hide: hide, show: show });
    });
  }
});

