require 'rails_helper'

RSpec.feature 'Visitor creates an account' do
  scenario "they are redirected to 'my parks'" do
    visit root_path
    click_link('Sign In')
    click_link("Don't have a WCS")
    fill_in 'user_username', with: 'buttclown95'
    fill_in 'user_email', with: 'juggalo@icplovers.org'
    fill_in 'user_password', with: 'thesmellofsack'
    click_button 'Register'

    user = User.last

    expect(current_path).to eq(user_path(user))
  end

  context 'with email already in use' do
    scenario 'they are bitch slapped by a flash error', js: true do
      user = create(:user)
      invalid_user = build(
        :user,
        username: 'jakovasaur',
        email: user.email,
        password: 'suckmyjaggon'
      )

      visit root_path
      click_link('Sign In')
      click_link("Don't have a WCS")
      fill_in 'user_username', with: invalid_user.username
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: invalid_user.password
      click_button 'Register'

      expect(current_path).to eq(new_user_path)
      expect(page).to have_text('Email has already been taken')
    end
  end
end
