def sign_in_user(user)
  visit root_path
  click_link 'Sign In'
  fill_in 'session_username', with: user.username
  fill_in 'session_password', with: user.password
  click_button 'Sign In'
end
