$(document).ready(function() {











  // opinionValidation('rating');
  opinionValidation('review');

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
    prompt: "Please select a rating"
  },
  rating: {
    validation: "empty",
    prompt: "Please write a review"
  },
}

var validators = {
  empty: function(input) {
    return input.length > 0
  },

  email: {
    prompt: "Please enter a valid email",
    validate: function(input) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}

function FormValidator(className, input) {
  this.validationKey = validationTypes[className.split("-")[0]];
  this.input = input;
}

FormValidator.prototype.validateForm = function() {
  var prompt = this.validationKey.prompt;
  var errorList = "<ul class='error-list'>"
  var validator = validators[this.validationKey.validation];

  if (validator($(this.input[0]).val())) {
    return true;
  } else {
    return errorList +"<li>"+ prompt +"</li>" + "</ul>";
  }
}






