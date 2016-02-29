$(document).ready(function() {
  opinionValidation('rating');
  opinionValidation('review');

  sessionValidation('log-in');
  sessionValidation('sign-up');

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
          identifier  : 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a value'
            }
          ]
        },
        password: {
          identifier  : 'password',
          rules: [
            {
              type   : 'minLength[6]',
              prompt : 'Password must be at least 6 characters'
            }
          ]
        }
      }
    };
    if (type === 'sign-up') {
      options.fields.email = {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid email'
          }
        ]
      };
    }
    $('.'+type+'-form').form(options);
  }
});
