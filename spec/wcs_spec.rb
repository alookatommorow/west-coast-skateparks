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
    expect(find('.search-form')).to have_button('Search')
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

end

# describe "the signin process", type: :feature do
#   before :each do
#     User.make(username: 'fogus', email: 'user@example.com', password: 'password')
#   end

#   it "signs me in" do
#     visit '/sessions/new'
#     within("#session") do
#       fill_in 'Username', :with => 'fogus'
#       fill_in 'Password', :with => 'password'
#     end
#     click_button 'Submit'
#     expect(page).to have_content 'Page'
#   end
# end