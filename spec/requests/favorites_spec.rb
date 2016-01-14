require 'rails_helper'

describe 'post /favorites (add favorite)' do
  it 'it creates a UserSkatepark and sets favorite = true' do
    user = create(:user)
    skatepark = create(:skatepark)

    post '/favorites', user_id: user.id, skatepark_id: skatepark.id

    favorite = Favorite.where(
      user_id: user.id,
      skatepark_id: skatepark.id).first

    expect(favorite).to be_truthy
  end
end

  describe 'put /favorites (remove favorite)' do
    it 'sets UserSkatepark visit = false' do
      user = create(:user)
      skatepark = create(:skatepark)
      Favorite.create(
        user_id: user.id, skatepark_id: skatepark.id)

      put '/favorites', user_id: user.id, skatepark_id: skatepark.id

      favorite = Favorite.where(
        user_id: user.id, skatepark_id: skatepark.id).first

      expect(favorite).to be_falsey
    end
  end
