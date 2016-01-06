describe 'Homepage', type: :feature do

  before do
    Capybara.app_host = 'http://localhost:3000'
  end

  it 'should load the home page' do
    visit '/'
    expect(page).to have_text('West Coast Skateparks')
  end

end

describe 'Show', type: :feature do

  it 'displays skatepark information' do
    visit '/skateparks/269'
    expect(page).to have_text('Ojai')
    expect(page).to have_text('Site Design')
  end


end

describe "the signup process", type: :feature do
  # before :each do
  #   User.make(username: 'fogus', email: 'user@example.com', password: 'password')
  # end

  it "signs up a new user and logs them in" do
    visit '/users/new'
    fill_in 'Username', with: 'fogus'
    fill_in 'Email', with: 'fogus@gmail.com'
    fill_in 'Password', with: 'password'
    click_button 'Register'
    expect(page).to have_content 'Page'
  end


end