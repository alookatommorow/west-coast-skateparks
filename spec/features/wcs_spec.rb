require 'rails_helper'

describe 'Homepage', type: :feature do
  it 'should load the home page' do
    visit '/'
    expect(page).to have_text('West Coast Skateparks')
  end

  # moved this from search spec because it seems more relevant here
  it 'should have working links' do
    visit '/'
    click_link('Skateparks')
    expect(page).to have_text('California')
  end
end

describe 'Show', type: :feature do
  it 'displays skatepark information' do
    skatepark = create(:skatepark)

    visit "/skateparks/#{skatepark.id}"
    expect(page).to have_text(skatepark.city)
    expect(page).to have_text(skatepark.state)
  end
end

describe "the signup process", type: :feature do
  it "signs up a new user and logs them in" do
    user = build(:user)

    visit '/users/new'
    fill_in 'Username', with: user.username
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Register'

    expect(page).to have_content 'Page'
  end
end
