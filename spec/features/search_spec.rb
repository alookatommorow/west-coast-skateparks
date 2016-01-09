require 'rails_helper'

describe 'Search', type: :feature, js: true do
  # this test is already kind of covered by all the other tests in here
  # should we take it out?
=begin
  it 'should have a search form' do
    visit '/'
    expect(find('.search-form')).to have_field('search')
  end
=end

  it 'should search properly and generate links to skateparks' do
    visit '/'
    fill_in 'search', with:'antioch'
    submit_search

    expect(page).to have_text('Search Results')
    find_link('Antioch (California)').click
    expect(page).to have_text("Antioch, California")
  end

  it 'can be closed' do
    visit '/'
    fill_in 'search', with:'ojai'
    submit_search

    expect(page).to have_text('Search Results')

    find('.close-search').click
    expect(page).not_to have_text('Search Results')
  end

  it 'is case insensitive' do
    visit '/'
    fill_in 'search', with:'OJAI'
    submit_search

    expect(page).to have_text('Ojai (California)')

    fill_in 'search', with:'Ojai'
    submit_search
    expect(page).to have_text('Ojai (California)')
  end
end

# Use this because capybara/webkit doesn't have send_keys method.
  # find_field('search').native.send_keys(:return)
def submit_search
  find('.input .search').click
end
