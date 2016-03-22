require 'rails_helper'

RSpec.feature 'User visits skatepark' do
  scenario 'it is added to their visited parks', js: true do

    skatepark = create(:skatepark)

    sign_in_user

    visit skatepark_path(skatepark)

    click_button 'Been Here'
    expect(page).to have_button('Never Been Here')

    click_link 'My Profile'
    expect(page).to have_text(skatepark.name.titleize)
  end
end