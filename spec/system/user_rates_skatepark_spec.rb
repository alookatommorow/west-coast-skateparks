require 'rails_helper'

RSpec.describe 'User rates skatepark' do
  scenario 'they see an updated user rating', js: true do
    user = create(:user)
    skatepark = create(:skatepark)
    review = 'This park IZ PRETTY CHILL -eatmyshortz'

    sign_in_user(user)
    visit skatepark_path(skatepark)
    expect(page).to have_text('No reviews yet')
    click_on 'Write a review'
    check '3', allow_label_click: true
    fill_in 'review', with: review
    click_on 'Submit'

    expect(page).to have_text('User Rating')
    expect(page).to have_css('.comment', text: review)
  end
end
