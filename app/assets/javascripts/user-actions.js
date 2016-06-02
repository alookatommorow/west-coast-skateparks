$(document).ready(function() {
  $('.ui.dropdown').dropdown(); // dropdown on rate form

  $("[data-ajax-container]").on("submit", "[data-ajax-button]", function (event) {
    if ($("[data-signed-in]").length > 0) {
      ajaxPost(this, renderButtonResponse);
    } else {
      sweetAlert();
    }
    event.preventDefault();
  });

  $("[data-ajax-container]").on("submit", "[data-ajax-form]", function (event) {
    ajaxPost(this, renderFormResponse);
    event.preventDefault();
    resetForm(this);
  });

  function sweetAlert() {
    return swal({
      title: "Hold Up!",
      text: "You must be signed in to do that",
      type: "warning",
      confirmButtonText: "Sign Up",
      showCancelButton: true
    }, function(){
      window.location.href = '/sessions/new.html';
    });
  }

  function renderFormResponse(response) {
    $container = $(this).data("ajax-form");
    $($container).html(response);
  }

  function renderButtonResponse(response) {
    $(this).closest("[data-ajax-container]").html(response);
  }

  function ajaxPost(form, callback) {
    $.post(form.action, $(form).serialize())
      .success(callback.bind(form));
  }

  function resetForm(form) {
    if ($(form).children(".dropdown").length > 0) {
      $(form).children(".dropdown").dropdown("restore defaults");
    } else {
      form.reset();
    }
  }
});
