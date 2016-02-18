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
    skatepark = create(:skatepark, name: 'hayward skatepark')

    visit "/skateparks/#{skatepark.id}"
    expect(page).to have_text(skatepark.city)
    expect(page).to have_text(skatepark.state)
  end
end

describe "the signup process", type: :feature do
  it "signs up a new user and logs them in" do
    user = build(:user)

    visit '/users/new'
    find('#username').set(user.username)
    find('#email').set(user.email)
    find('#password').set(user.password)
    click_button 'Register'

    expect(page).to have_content user.username.capitalize
  end
end
