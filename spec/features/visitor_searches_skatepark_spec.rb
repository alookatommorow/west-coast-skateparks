require 'rails_helper'

RSpec.feature 'Visitor searches skatepark' do
  scenario 'they see a working link to the skatepark', js: true do
    skatepark = create(:skatepark)
    stub_skateparks_json

    visit root_path
    find('.display-search').click

    fill_in 'react-search-input', with: "Turd nugget"
    expect(page).to have_text("No Results")
    fill_in 'react-search-input', with: skatepark.name
    expect(page).to have_text(skatepark.name.titleize)

    stub_weather

    click_link skatepark.name.titleize

    expect(page).to have_text(skatepark.address)
  end
end