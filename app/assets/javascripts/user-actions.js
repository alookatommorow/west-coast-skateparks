$(document).ready(function() {
  $('form[data-ajax-toggle]').each(bindAjaxToggle);
  $('button[data-slide-toggle]').each(bindSlideToggle);

  function bindAjaxToggle(_, domEl) {
    $(domEl).on('submit', function (event) {
      AJAX(event, function() { hideMeShowOpposite($(event.target)); });
    });
  }

  function bindSlideToggle(_, domEl) {
    $(domEl).on('click', function (event) {
      event.preventDefault();
      $($(event.target).data('slide-toggle')).slideToggle(500);
    });
  }

  function hideMeShowOpposite(target) {
    target.hide();
    $(target.data('ajax-toggle')).show();
  }
});
