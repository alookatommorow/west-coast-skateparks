$(document).ready(function() {

  $("textarea.validate").focus(function() {
    event.stopPropagation();
    console.log("event firing");
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }
  })

  sessionValidation('session');
  sessionValidation('user');

  function opinionValidation(type) {
    var options = { fields: {} };
    options.fields[type] = {
      identifier: type,
      rules: [
        {
          type: 'empty',
          prompt: 'Please select a '+type
        }
      ]
    };
    $('.'+type+'-form').form(options);
  }

  function sessionValidation(type) {
    var options = {
      fields: {
        username: {
          identifier  : type+'_username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a value'
            }
          ]
        },
        password: {
          identifier  : type+'_password',
          rules: [
            {
              type   : 'minLength[6]',
              prompt : 'Password must be at least 6 characters'
            }
          ]
        }
      }
    };
    if (type === 'user') {
      options.fields.email = {
        identifier  : 'user_email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid email'
          }
        ]
      };
    }
    $('.'+type).form(options);
  }
});

var validationTypes = {
  rating: {
    validation: "empty",
    prompt: "Please select a rating",
    input: "input",
    counterpart: ".selection.dropdown"
  },
  review: {
    validation: "empty",
    prompt: "Please write a review",
    counterpart: "textarea",
    input: "textarea",
  },
}

var validators = {
  empty: function(input) {
    return input.length > 0;
  },

  email: {
    prompt: "Please enter a valid email",
    validate: function(input) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}

function FormValidator(form) {
  this.form = form;
  this.validationKey = validationTypes[form.className.split("-")[0]];
  this.errors = [];


}

FormValidator.prototype.validateForm = function() {
  var prompt = this.validationKey.prompt;
  var input = $(this.form).find(this.validationKey.input + ".validate");
  var errorList = "<ul class='error-list'>";
  var validator = validators[this.validationKey.validation];
  var counterpart = this.validationKey.counterpart;

  if (validator($(input[0]).val())) {
    $(".error.message").hide();
    return true;
  } else {
    errorList += "<li>"+ prompt +"</li>" + "</ul>";
    $(this.form).find(counterpart).addClass("error");
    $(this.form).find(".error.message").html(errorList).show();
  }
}






