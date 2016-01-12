require 'rails_helper'

describe 'user adds a favorite' do
  it 'creates a UserSkatepark and sets favorite = true' do
    user = create(:user)
    skatepark = create(:skatepark)

    post '/favorites', user_id: user.id, skatepark_id: skatepark.id

    user_skatepark = UserSkatepark.where(
      user_id: user.id, skatepark_id: skatepark.id).first

    expect(user_skatepark.favorite).to eq(true)
  end
end