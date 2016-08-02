require 'rails_helper'

RSpec.feature 'Visitor searches skatepark' do
  scenario 'they see a working link to the skatepark', js: true do
    skatepark = create(:skatepark)

    visit root_path
    fill_in 'react-search-input', with: skatepark.name

    expect(page).to have_text(skatepark.name.titleize)
    expect(page).not_to have_text('No Results')

    stub_weather

    click_link skatepark.name.titleize

    expect(page).to have_text(skatepark.address)
  end
end