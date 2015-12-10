describe 'Homepage', type: :feature do

  before do
    Capybara.app_host = 'http://localhost:3000'
  end

  it 'should load the home page' do
    visit '/'
    expect(page).to have_text('West Coast Skateparks')
  end

end

describe 'Search', type: :feature do

  it 'should have a search form' do
    visit '/'
    expect(find('.search-form')).to have_field('search')
  end

  it 'should search properly and generate links to skateparks' do
    visit '/'
    fill_in 'search', with:'ojai'
    find_field('search').native.send_keys(:return)
    expect(page).to have_text('Search Results')
    all('.item').last.click
    expect(page).to have_text('Address')
  end

  it 'can be closed search' do
    visit '/'
    fill_in 'search', with:'ojai'
    find_field('search').native.send_keys(:return)
    expect(page).to have_text('Search Results')
    find('.close-search').click
    expect(page).not_to have_text('Search Results')
  end

  it 'is case insensitive' do
    visit '/'
    fill_in 'search', with:'OJAI'
    find_field('search').native.send_keys(:return)
    expect(page).to have_text('Ojai (California)')
    fill_in 'search', with:'Ojai'
    find_field('search').native.send_keys(:return)
    expect(page).to have_text('Ojai (California)')
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