$(document).ready(function() {
  $('.add-visit-button').on('submit', function(event){
    visitRequest('post', $(event.target), $('.remove-visit-button'));
  });

  $('.remove-visit-button').on('submit', function(event){
    visitRequest('put', $(event.target), $('.add-visit-button'));
  });

  function visitRequest(method, hide, show) {
    AJAX(event, method, function () {
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

