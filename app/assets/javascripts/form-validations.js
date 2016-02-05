$(document).ready(function() {

  ///// review form validation //////
  $('.review-form').form({
      fields: {
        review: {
          identifier  : 'review',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a review'
            }
          ]
        }
      }
    });

  ///// rate form validation //////
  $('.rate-form').form({
      fields: {
        rating: {
          identifier  : 'rating',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please select a rating'
            }
          ]
        }
      }
    });


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