require 'rails_helper'

RSpec.feature 'Admin signs in' do
  scenario 'they are redirected to admin dashboard' do
    user = create(:user, admin: true)

    visit new_session_path
    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password
    click_button 'Submit'

    expect(current_path).to eq(admin_root_path)
  end
end
