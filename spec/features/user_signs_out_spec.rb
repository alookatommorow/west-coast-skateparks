require 'rails_helper'

RSpec.feature 'User signs out' do
  scenario 'is redirected to root path' do
    user = create(:user)

    sign_in_user(user)

    click_link 'Sign Out'

    expect(current_path).to eq(root_path)
  end
end