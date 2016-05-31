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
    if (response.length > 0) {
      $container = $(this).data("ajax-form");
      $($container).html(response);
    } else {
      swal({
        title: "Hold Up!",
        text: "You must be signed in to do that",
        type: "warning",
        confirmButtonText: "Sign Up",
        showCancelButton: true
      }, function(){
        window.location.href = '/sessions/new.html';
      });
    }
  }

  function resetForm(form) {
    if ($(form).children(".dropdown").length > 0) {
      $(form).children(".dropdown").dropdown("restore defaults");
    } else {
      form.reset();
    }
  }
});
