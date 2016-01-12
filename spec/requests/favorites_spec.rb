require 'rails_helper'

describe 'post /favorites (add favorite)' do
  it 'it creates a UserSkatepark and sets favorite = true' do
    user = create(:user)
    skatepark = create(:skatepark)

    post '/favorites', user_id: user.id, skatepark_id: skatepark.id

    user_skatepark = UserSkatepark.where(
      user_id: user.id, skatepark_id: skatepark.id).first

    expect(user_skatepark.favorite).to eq(true)
  end
end

  describe 'put /favorites (remove favorite)' do
    it 'sets UserSkatepark visit = false' do
      user = create(:user)
      skatepark = create(:skatepark)
      UserSkatepark.create(
        user_id: user.id, skatepark_id: skatepark.id, favorite: true)

      put '/favorites', user_id: user.id, skatepark_id: skatepark.id

      user_skatepark = UserSkatepark.where(
        user_id: user.id, skatepark_id: skatepark.id).first

      expect(user_skatepark.visited).to eq(false)
    end
  end
