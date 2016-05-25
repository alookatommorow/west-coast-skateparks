$(document).ready(function() {
  $('.ui.dropdown').dropdown(); // dropdown on rate form

  $("[data-ajax-container]").on("submit", "[data-ajax-form]", function (event) {
    $.post(this.action, $(this).serialize())
      .success(renderResponse.bind(this));
    event.preventDefault();
  });

  function renderResponse(response) {
    $(this).closest("[data-ajax-container]").html(response);
    $('.ui.dropdown').dropdown();
  }
});
