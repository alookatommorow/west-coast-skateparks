def sign_in_user(user)
  visit root_path
  click_link 'Sign In'
  find('#username-sign-in').set(user.username)
  find('#password-sign-in').set(user.password)
  click_button 'Sign In'
end