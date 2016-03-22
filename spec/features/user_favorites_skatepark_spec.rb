require 'rails_helper'

RSpec.feature 'User favorites skatepark' do
  scenario 'it is added to their favorite parks', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    visit root_path
    click_link 'Sign In'
    find('#username-sign-in').set(user.username)
    find('#password-sign-in').set(user.password)
    click_button 'Submit'

    visit skatepark_path(skatepark)

    click_button 'Favorite'
    expect(page).to have_button('Unfavorite')

    click_link 'My Profile'
    expect(page).to have_text(skatepark.name.titleize)
  end
end
