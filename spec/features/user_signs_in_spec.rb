require 'rails_helper'

RSpec.feature 'User signs in' do
  scenario 'tries to access admin dashboard and is redirected with error message' do
    user = create(:user)

    visit new_session_path
    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password
    click_button 'Submit'

    visit admin_root_path

    expect(current_path).to eq(new_session_path)
    expect(page).to have_text('You need admin authentication to access that.')
  end

  scenario 'is redirected to their homepage, and can sign out if they choose' do
    user = create(:user)

    visit new_session_path
    fill_in 'Username', with: user.username
    fill_in 'Password', with: user.password
    click_button 'Submit'

    expect(current_path).to eq(user_path(user))
    expect(page).to have_text("#{user.username.capitalize}'s Page")

    click_link 'Sign Out'
    expect(current_path).to eq(root_path)
  end
end
