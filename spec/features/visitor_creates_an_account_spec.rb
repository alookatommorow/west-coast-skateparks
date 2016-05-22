require 'rails_helper'

RSpec.feature 'Visitor creates an account' do
  scenario "they are redirected to 'my parks'" do
    visit root_path
    click_link("Sign In")
    click_link("Don't have a WCS")
    find('#username').set('buttclown95')
    find('#email').set('juggalo@icplovers.org')
    find('#password').set('thesmellofsack')
    click_button 'Register'

    user = User.last

    expect(current_path).to eq(user_path(user))
  end

  context 'with email already in use' do
    scenario 'they are bitch slapped by a flash error' do
      user = create(:user)
      invalid_user = build(:user,
        username: 'jakovasaur',
        email: user.email,
        password: 'suckmyjaggon')

      visit root_path
      click_link("Sign In")
      click_link("Don't have a WCS")
      find('#username').set(invalid_user.username)
      find('#email').set(user.email)
      find('#password').set(invalid_user.password)
      click_button 'Register'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_text(invalid_user.errors.full_messages.first)
    end
  end
end
