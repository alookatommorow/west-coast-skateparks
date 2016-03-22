require 'rails_helper'

RSpec.feature 'User reviews skatepark' do
  scenario 'they see their username and review', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    visit root_path
    click_link 'Sign In'
    find('#username-sign-in').set(user.username)
    find('#password-sign-in').set(user.password)
    click_button 'Submit'

    visit skatepark_path(skatepark)

    click_on 'Review Skatepark'
    fill_in 'Write review here...', with: 'This park IZ PRETTY CHILL -eatmyshortz'
    click_on 'Review'

    expect(page).to have_text(user.name)
    expect(page).to have_text('This park IZ PRETTY CHILL -eatmyshortz')
  end
end