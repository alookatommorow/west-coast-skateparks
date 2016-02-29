$(document).ready(function() {
  opinionValidation('rating');
  opinionValidation('review');

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

  ///// sign-in form validation //////
  $('.sign-in-form').form({
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
    });

  ///// sign-up form validation //////
  $('.sign-up-form').form({
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
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter a valid email'
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
  });
});
