$(document).ready(function() {

  $("textarea.validate").focus(function() {
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
  });

});


var validationTypes = {
  rating: {
    prompt: "Please select a rating",
    counterpart: ".selection.dropdown",
    validator: "empty",
  },

  review: {
    prompt: "Please write a review",
    counterpart: "textarea",
    validator: "empty",
  },

  email: {
    prompt: "Please enter a valid email address",
    counterpart: "[placeholder='Email']",
    validator: "email"
  },

  password: {
    prompt: 'Password must be at least 6 characters',
    counterpart: "[placeholder='Password']",
    validator: "length",
  },

  username: {
    prompt: 'Please enter a username',
    counterpart: "[placeholder='Username']",
    validator: "empty"
  }
}

var validators = {
  empty: function(input) {
    return input.length > 0;
  },

  email: function(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
  },

  length: function(input) {
    return input.length >= 6;
  }
}

function FormValidator(form) {
  this.form = form;
}

FormValidator.prototype.validateForm = function() {
  var inputTypes = [];
  var validationType, validator;
  var input = $(this.form).find(".validate");
  var errorCounterparts = [];
  var errorList = "<ul class='error-list'>";

  $(input).each(function(item) {
    validationType = input[item].className.split(" ")[1];
    validator = validators[validationTypes[validationType].validator];
    if ( !validator($(input[item]).val()) ) {
      errorList += "<li>" + validationTypes[validationType].prompt + "</li>";
      errorCounterparts.push(validationTypes[validationType].counterpart)
    } else {
      $("" + validationTypes[validationType].counterpart + "").removeClass("error");
    }
  });

  if (errorCounterparts.length > 0) {
    $(this.form).find(".error.message").html(errorList).show();
    $(""+errorCounterparts.join(", ")+"").addClass("error");
  } else {
    $(".error.message").hide();
    return true;
  }
}






