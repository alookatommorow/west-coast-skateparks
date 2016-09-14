require 'rails_helper'

RSpec.feature 'Visitor selects skatepark from index' do
  scenario 'Sees working links for skateparks from each state', js: true do
    oregon = create(:location, state: "oregon", city: "Bend")
    washington = create(:location, state: "washington", city: "Seattle")
    or_skatepark = create(:skatepark, location: oregon)
    wa_skatepark = create(:skatepark, location: washington)

    visit root_path
    click_link "Skateparks"
    click_link "OR"
    click_link "B"

    expect(page).to have_text(or_skatepark.name.titleize)
    expect(page).not_to have_text(wa_skatepark.name.titleize)

    click_link "WA"
    click_link "S"

    expect(page).to have_text(wa_skatepark.name.titleize)
    expect(page).not_to have_text(or_skatepark.name.titleize)

    #use this syntax because of bug when trying to click inline block links
    find('a.index-link').click

    expect(page).to have_text(wa_skatepark.address)
  end
end
