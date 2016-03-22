require 'rails_helper'

RSpec.feature 'User selects skatepark from index' do
  scenario 'Sees working links for skateparks from each state', js: true do
    ca_skatepark = create(:skatepark, state: 'california')
    or_skatepark = create(:skatepark, state: 'oregon')

    visit root_path
    click_link "Skateparks"
    click_link "California"

    expect(page).to have_text(ca_skatepark.name.titleize)
    expect(page).not_to have_text(or_skatepark.name.titleize)

    click_link "Oregon"

    expect(page).to have_text(or_skatepark.name.titleize)
    expect(page).not_to have_text(ca_skatepark.name.titleize)

    click_link or_skatepark.name.titleize

    expect(page).to have_text(or_skatepark.address)
  end
end