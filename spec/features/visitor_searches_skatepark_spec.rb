require 'rails_helper'

RSpec.feature 'Visitor searches skatepark' do
  scenario 'they see a working link to the skatepark', js: true do
    skatepark = create(:skatepark)

    visit root_path

    fill_in 'query', with: 'Turd nugget'
    expect(page).to have_text('0 Matches')
    fill_in 'query', with: skatepark.name
    expect(page).to have_text(skatepark.name.titleize)

    click_link skatepark.name.titleize

    expect(page).to have_text(skatepark.address)
  end
end
