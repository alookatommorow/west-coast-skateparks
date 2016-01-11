require 'rails_helper'

#add helper method for signing in

describe 'user creates a favorite', type: :feature, js: true do

  scenario 'user adds favorite' do
    user = create(:user)
    skatepark = create(:skatepark)
    sign_in(user)
    visit "/skateparks/#{skatepark.id}"
    click_on('Favorite')
    expect(page).to have_text('Unfavorite')
    user_skatepark = UserSkatepark.where(user_id: user.id, skatepark_id: skatepark.id).first
    expect(user_skatepark.favorite).to eq(true)
  end

end

def sign_in(user)
  visit '/sessions/new'
  fill_in 'Username', with: user.username
  fill_in 'Password', with: user.password
  click_button 'Submit'
end