require 'rails_helper'

RSpec.feature 'user edits info' do
  scenario 'their info is updated' do
    user = create(:user, name: 'Not Steve')

    sign_in_user(user)
    visit user_path(user)
    click_on 'Edit Info'
    fill_in 'Name', with: 'Steve'
    fill_in 'Username', with: 'stevey_pants_69'
    click_button 'Update'

    expect(page).to have_text 'Righteous.'
    expect(page).to have_text 'Steve'
    expect(page).to have_text 'stevey_pants_69'
  end
end
