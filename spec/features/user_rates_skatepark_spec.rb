require 'rails_helper'

RSpec.feature 'User rates skatepark' do
  scenario 'they see an updated user rating', js: true do
    user = create(:user)
    skatepark = create(:skatepark)

    sign_in_user(user)
    visit skatepark_path(skatepark)

    click_on 'Rate'

    expect(page).to have_text('Sign in and be the first to rate!')

    find('#rating', visible: false).set '1'

    find('.rating-form-container').click_on 'Rate'

    expect(page).to have_text('User Rating')
  end
end


