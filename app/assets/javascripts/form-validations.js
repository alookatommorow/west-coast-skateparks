$(document).ready(function() {
  opinionValidation('rating');
  opinionValidation('review');

  sessionValidation('new_session');
  sessionValidation('new_user');

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
          identifier  : 'user_username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a value'
            }
          ]
        },
        password: {
          identifier  : 'user_password',
          rules: [
            {
              type   : 'minLength[6]',
              prompt : 'Password must be at least 6 characters'
            }
          ]
        }
      }
    };
    if (type === 'new_user') {
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
