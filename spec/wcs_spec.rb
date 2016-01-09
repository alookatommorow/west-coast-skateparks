require 'rails_helper'

describe 'Homepage', type: :feature do
  it 'should load the home page' do
    visit '/'
    expect(page).to have_text('West Coast Skateparks')
  end
end

describe 'Show', type: :feature do
  it 'displays skatepark information' do
    visit '/skateparks/269'
    expect(page).to have_text('Oceanside')
    expect(page).to have_text('John Landes Skatepark')
  end
end

describe "the signup process", type: :feature do
  it "signs up a new user and logs them in" do
    visit '/users/new'
    fill_in 'Username', with: 'fogus'
    fill_in 'Email', with: 'fogus@gmail.com'
    fill_in 'Password', with: 'password'
    click_button 'Register'
    expect(page).to have_content 'Page'
  end
end
