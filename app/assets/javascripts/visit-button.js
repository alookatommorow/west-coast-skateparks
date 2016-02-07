$(document).ready(function() {
  $('.add-visit-button').on('submit', function(event){
    AJAX(event, 'post', function () {
      toggleVisibility({
        show: $('.remove-visit-button'),
        hide: $('.add-visit-button')
      });
      toggleOpinionsDisplay();
    });
  });

  $('.remove-visit-button').on('submit', function(event){
    AJAX(event, 'put', function () {
      toggleVisibility({
        hide: $('.remove-visit-button'),
        show: $('.add-visit-button')
      });
      toggleOpinionsDisplay();
    });
  });

  function toggleOpinionsDisplay() {
    var $opinions = $('.opinions-container');

    if ($opinions.hasClass('hidden')) {
      $opinions.addClass('hidden');
    } else {
      $opinions.removeClass('hidden');
    }
  }
});

