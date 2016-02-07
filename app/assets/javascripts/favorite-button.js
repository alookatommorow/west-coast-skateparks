$(document).ready(function() {
  $('.add-favorite-button').on('submit', function(event){
    AJAX(event, 'post', function () {
      toggleVisibility({
        show: $('.remove-favorite-button'),
        hide: $('.add-favorite-button')
      });
    });
  });

  $('.remove-favorite-button').on('submit', function(event){
    AJAX(event, 'put', function () {
      toggleVisibility({
        show: $('.add-favorite-button'),
        hide: $('.remove-favorite-button')
      });
    });
  });
});

