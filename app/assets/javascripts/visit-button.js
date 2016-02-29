$(document).ready(function() {
  $('.add-visit-button').on('submit', function(event){
    visitRequest($(event.target), $('.remove-visit-button'));
  });

  $('.remove-visit-button').on('submit', function(event){
    visitRequest($(event.target), $('.add-visit-button'));
  });

  function visitRequest(hide, show) {
    AJAX(event, function () {
      toggleVisibility({ hide: hide, show: show });
      toggleOpinionsDisplay();
    });
  }

  function toggleOpinionsDisplay() {
    var $opinions = $('.opinions-container');

    if ($opinions.hasClass('hidden')) {
      $opinions.removeClass('hidden');
    } else {
      $opinions.addClass('hidden');
    }
  }
});

