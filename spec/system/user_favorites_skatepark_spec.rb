require 'rails_helper'

RSpec.describe 'User favorites skatepark' do
  scenario 'it is added to their favorite parks', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    sign_in_user(user)
    visit skatepark_path(skatepark)

    click_button 'favorite'
    click_link 'My Profile'

    expect(page).to have_text(skatepark.name.titleize)

    visit skatepark_path(skatepark)
    click_button 'favorite'
    click_link 'My Profile'

    expect(page).not_to have_text(skatepark.name.titleize)
  end
end
