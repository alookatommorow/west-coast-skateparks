require 'rails_helper'

RSpec.describe 'Visitor selects skatepark from index' do
  scenario 'Sees working links for skateparks from each state', js: true do
    or_skatepark = create(:skatepark, state: 'oregon', city: 'Bend')
    wa_skatepark = create(:skatepark, state: 'washington', city: 'Seattle')

    visit root_path
    click_link 'Skateparks'
    click_link 'OR'
    click_link 'B'

    expect(page).to have_text(or_skatepark.name.titleize)
    expect(page).not_to have_text(wa_skatepark.name.titleize)

    click_link 'WA'
    click_link 'S'

    expect(page).to have_text(wa_skatepark.name.titleize)
    expect(page).not_to have_text(or_skatepark.name.titleize)

    # use this syntax because of bug when trying to click inline block links
    find('a.index-link').click

    expect(page).to have_text(wa_skatepark.address)
  end
end
