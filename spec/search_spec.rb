describe 'Search', type: :feature do
  before do
    Capybara.app_host = 'http://localhost:3000'
  end

  it 'should have working links' do
    visit '/'
    click_link('Skateparks')
    expect(page).to have_text('California')
  end

  it 'should have a search form' do
    visit '/'
    expect(find('.search-form')).to have_field('search')
  end

  it 'should search properly and generate links to skateparks' do
    visit '/'
    fill_in 'search', with:'antioch'
    find_field('search').native.send_keys(:return)
    expect(page).to have_text('Search Results')
    find_link('Antioch (California)').click
    # click_link('Antioch (California)')
    # p page.current_path
    expect(page).to have_text("Antioch, California")

  end

  it 'can be closed' do
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