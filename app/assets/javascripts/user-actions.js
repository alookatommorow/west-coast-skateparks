$(document).ready(function() {

  $("[data-ajax-container]").on("submit", "[data-ajax-button]", function (event) {
    if ($("[data-signed-in]").length > 0) {
      ajaxPostWithLoader(this, renderButtonResponse);
    } else {
      sweetAlert();
    }

    event.preventDefault();
  });


  $("[data-ajax-container]").on("submit", "[data-ajax-form]", function (event) {
    event.preventDefault();

    var className = this.className
    var formInput = $(this).find("input.validate");
    var validation = new FormValidator(className, formInput).validateForm();

    if (validation === true) {
      ajaxPost(this, renderFormResponse);
      resetForm(this);
    } else {
      $(this).find(".error.message").html(validation).show();
    }

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
    $.post(form.action, $(form).serialize())
      .success(callback.bind(form));
  }

  function ajaxPostWithLoader(form, callback) {
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
      $(form).find("input.validate").removeAttr("value");
      $(".dropdown .text").text("Select Rating...").addClass("default");
    } else {
      form.reset();
    }
  }
});
