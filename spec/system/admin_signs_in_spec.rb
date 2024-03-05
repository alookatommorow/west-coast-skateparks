require 'rails_helper'

RSpec.feature 'Admin signs in' do
  scenario 'they are redirected to admin dashboard' do
    admin = create(:user, admin: true)

    sign_in_user(admin)

    expect(current_path).to eq(admin_root_path)
  end
end
