require 'rails_helper'

RSpec.describe 'Visitor views skatepark page', type: :feature do
  scenario "they see the skatepark's info" do
    skatepark = create(:skatepark, state: 'california')

    visit root_path

    expect(page).to have_text('West Coast Skateparks')

    click_link('Skateparks')
    expect(page).to have_text('California')

    # when we figure out ajax situation, have this actually be the user clicking the link
    visit skatepark_path(skatepark)

    expect(page).to have_text(skatepark.city.titleize)
    expect(page).to have_text(skatepark.state.titleize)
  end
end
