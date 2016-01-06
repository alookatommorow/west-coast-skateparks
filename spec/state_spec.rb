describe 'State', type: :feature do
  before do
    Capybara.app_host = 'http://localhost:3000'
  end

  it 'should generate working links' do
    visit '/skateparks'
    click_link('California')
    find_link('American Canyon').click
    expect(page).to have_text('American Canyon (California)')
  end


end