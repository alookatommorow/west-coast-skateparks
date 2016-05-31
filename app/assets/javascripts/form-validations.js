$(document).ready(function() {
  opinionValidation('rating');
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
          identifier  : ''+type+'_username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a value'
            }
          ]
        },
        password: {
          identifier  : ''+type+'_password',
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
