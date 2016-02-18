require 'rails_helper'

RSpec.feature 'Admin signs in' do
  scenario 'they are redirected to admin dashboard' do
    user = create(:user, admin: true)

    visit root_path
    find('#username-sign-in').set(user.username)
    find('#password-sign-in').set(user.password)
    click_button 'Submit'

    expect(current_path).to eq(admin_root_path)
  end
end
