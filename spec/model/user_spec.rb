require 'rails_helper'

RSpec.describe User, type: :model do
  context '#favorite_parks' do
    it "returns user's favorited parks" do
      user = create(:user)
      skatepark = create(:skatepark)

      Favorite.create(
        user_id: user.id, skatepark_id: skatepark.id)

      fav_park = user.favorite_parks.first
      expect(fav_park.id).to eq(skatepark.id)
      expect(fav_park.city).to eq(skatepark.city)
      expect(fav_park.state).to eq(skatepark.state)
      expect(fav_park.address).to eq(skatepark.address)
    end
  end

  context '#favorites_and_visits' do
    it 'returns a hash of all favorited and visited parks' do
      user = create(:user)
      skatepark = create(:skatepark)
      user.favorite_parks << skatepark
      user.visited_parks << skatepark

      favorites_and_visits = {
        favorite_parks: user.favorite_parks,
        visited_parks: user.visited_parks
      }

      expect(user.favorites_and_visits).to eq(favorites_and_visits)
    end
  end
end
