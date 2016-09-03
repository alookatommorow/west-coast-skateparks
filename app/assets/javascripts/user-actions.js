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

  $("[data-ajax-container]").on("click", "[data-ajax-weather]", function (event) {
    event.preventDefault();
    $.ajax({
      url: this.href,
      data: {
        latitude: $(this).data("latitude"),
        longitude: $(this).data("longitude")
      },
      beforeSend: function() {
        $(this).hide();
        $(this).prev(".weather-loading-container").show();
      }.bind(this)
    })
    .done(renderButtonResponse.bind(this))
    .fail(function(response){
      console.log("error", response);
    });
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
    $.ajax({
      url: form.action,
      method: "POST",
      data: $(form).serialize(),
      beforeSend: function() {
        $(form).hide();
        $(form).prev(".button-loading-container").show();
      }
    })
    .done(callback.bind(form))
    .fail(function(response){
      console.log("error", response);
    });
  }

  function resetForm(form) {
    if ($(form).children(".dropdown").length > 0) {
      $(form).children(".dropdown").dropdown("restore defaults");
    } else {
      form.reset();
    }
  }
});
