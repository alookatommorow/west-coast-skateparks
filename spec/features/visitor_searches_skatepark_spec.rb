require 'rails_helper'

RSpec.feature 'Visitor searches skatepark' do
  scenario 'they see a working link to the skatepark', js: true do
    skatepark = create(:skatepark)

    visit root_path
    first('.search-nav').click
    fill_in 'search', with: 'ragamuffin skank'
    submit_search

    expect(page).to have_text('No Results')

    fill_in 'search', with: skatepark.name
    find('#search-button').click

    expect(page).to have_text(skatepark.name.titleize)
    expect(page).not_to have_text('No Results')

    click_link skatepark.name.titleize

    expect(page).to have_text(skatepark.address)
  end
end

 # Use this because capybara/webkit doesnt have send_keys method.
 # find_field('search').native.send_keys(:return)

def submit_search
  find('.input .search').click
end