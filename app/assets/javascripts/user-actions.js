$(document).ready(function() {
  $('.ui.dropdown').dropdown(); // dropdown on rate form

  $("[data-ajax-container]").on("submit", "[data-ajax-form]", function (event) {
    $.post(this.action, $(this).serialize())
      .success(renderResponse.bind(this));

    event.preventDefault();

    if ($(this).data("reset-form")) {
      resetForm(this);
    }
  });

  function renderResponse(response) {
    $container = $(this).data("ajax-form");
    $($container).html(response);
  }

  function resetForm(form) {
    if ($(form).children(".dropdown").length > 0) {
      $(form).children(".dropdown").dropdown("restore defaults");
    } else {
      form.reset();
    }
  }
});
