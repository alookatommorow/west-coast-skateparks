require 'rails_helper'

RSpec.feature 'User rates skatepark' do
  scenario 'they see an updated user rating', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    sign_in_user(user)

    visit skatepark_path(skatepark)

    expect(page).to have_text('Be the first to rate!')

    click_on 'Rate Skatepark'
    find('#rating', visible: false).set '1'
    click_on 'Rate'

    expect(page).not_to have_text('Be the first to rate!')
  end
end


