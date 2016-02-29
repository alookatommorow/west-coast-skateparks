$(document).ready(function() {
  $('form[data-toggle]').each(bindAjaxToggle);

  function bindAjaxToggle(_, domEl) {
    $(domEl).on('submit', function (event) {
      AJAX(event, function() { hideMeShowOpposite($(event.target)); });
    });
  }
});
