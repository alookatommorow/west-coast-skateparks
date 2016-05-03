$(document).ready(function() {
  $('button[data-slide-toggle]').each(bindSlideToggle);
  $('.ui.dropdown').dropdown(); // dropdown on rate form

  $("[data-ajax-container]").on("submit", "[data-ajax-form]", function (event) {
    $.post(this.action, $(this).serialize())
      .success(renderResponse.bind(this));
    event.preventDefault();
  });

  function renderResponse(response) {
    $(this).closest("[data-ajax-container]").html(response);
  }

  function bindSlideToggle(_, domEl) {
    $(domEl).on('click', function (event) {
      event.preventDefault();
      $($(event.target).data('slide-toggle')).slideToggle(500);
    });
  }
});
