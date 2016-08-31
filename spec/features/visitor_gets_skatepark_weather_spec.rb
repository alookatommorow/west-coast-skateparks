require 'rails_helper'

RSpec.feature 'User gets weather for a skatepark' do
  scenario 'they see weather conditions', js: true do
    skatepark = create(:skatepark)
    stub_weather

    visit skatepark_path(skatepark)

    click_button 'Local Weather'

    expect(page).to have_text("Overcast")
  end
end