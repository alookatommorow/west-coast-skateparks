require 'rails_helper'

RSpec.feature 'User searches for skatepark' do
  scenario 'they see a working link to the skatepark', js: true do
    skatepark = create(:skatepark)

    visit root_path
    find('.search-button').click
    fill_in 'search', with: skatepark.name
    submit_search

    expect(page).to have_text(skatepark.name.titleize)

    click_link skatepark.name.titleize

    expect(page).to have_text(skatepark.address)
  end
end

 # Use this because capybara/webkit doesnt have send_keys method.
 # find_field('search').native.send_keys(:return)

def submit_search
  find('.input .search').click
end