require 'rails_helper'

RSpec.feature 'User visits skatepark' do
  xscenario 'it is added to their visited parks', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    sign_in_user(user)
    visit skatepark_path(skatepark)
    click_button 'Been Here'
    click_link 'My Profile'

    expect(page).to have_text(skatepark.name.titleize)

    visit skatepark_path(skatepark)
    click_button "Never Been Here"
    click_link 'My Profile'

    expect(page).not_to have_text(skatepark.name.titleize)
  end
end
