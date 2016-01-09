require 'rails_helper'

describe 'State', type: :feature, js: true do
  it 'should generate working links' do
    visit '/skateparks'
    click_link('California')
    find_link('American Canyon').click
    expect(page).to have_text('American Canyon, California')
  end
end
