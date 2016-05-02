require 'rails_helper'

RSpec.feature 'Visitor selects skatepark from index' do
  scenario 'Sees working links for skateparks from each state', js: true do
    or_skatepark = create(:skatepark, :oregon)
    wa_skatepark = create(:skatepark, :washington)

    visit root_path
    click_link "Skateparks"
    click_link "OR"

    expect(page).to have_text(or_skatepark.name.titleize)
    expect(page).not_to have_text(wa_skatepark.name.titleize)

    click_link "WA"

    expect(page).to have_text(wa_skatepark.name.titleize)
    expect(page).not_to have_text(or_skatepark.name.titleize)

    click_link wa_skatepark.name.titleize

    expect(page).to have_text(wa_skatepark.address)
  end
end