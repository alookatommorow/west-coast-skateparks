require 'rails_helper'


# describe 'Search', type: :feature, js: true do
#   it 'should search properly and generate links to skateparks' do
#     visit '/'
#     find(:css, '.search-button').click
#     fill_in 'search', with:'ojai'
#     submit_search
#     expect(page).to have_text('Ojai Skatepark')
#   end

#   it 'can be closed' do
#     visit '/'
#     fill_in 'search', with:'ojai'
#     submit_search

#     expect(page).to have_text('Search Results')

#     find('.close-search').click
#     expect(page).not_to have_text('Search Results')
#   end

#   it 'is case insensitive' do
#     visit '/'
#     fill_in 'search', with:'OJAI'
#     submit_search

#     expect(page).to have_text('Ojai Skatepark (California)')

#     fill_in 'search', with:'Ojai'
#     submit_search
#     expect(page).to have_text('Ojai Skatepark (California)')
#   end
# end

# Use this because capybara/webkit doesn't have send_keys method.
  # find_field('search').native.send_keys(:return)
# def submit_search
#   find('.input .search').click
# end

