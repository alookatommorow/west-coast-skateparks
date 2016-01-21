require 'rails_helper'

RSpec.describe User, type: :model do
  context '#favorite_parks' do
    it "returns user's favorited parks" do
      user = create(:user)
      skatepark = create(:skatepark)

      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

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
      other = create(:skatepark, :other)

      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)
      create(:visit, user_id: user.id, skatepark_id: other.id)

      favorites_and_visits = {
        favorite_parks: user.favorite_parks,
        visited_parks: user.visited_parks,
        both: []
      }

      expect(user.favorites_and_visits).to eq(favorites_and_visits)
    end

    it 'returns parks as favorited and visited if they are both' do
      user = create(:user)
      skatepark = create(:skatepark)
      favorited_park = create(:skatepark, :other)
      visited_park = create(:skatepark, identifier: 'SUP')

      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)
      create(:favorite, user_id: user.id, skatepark_id: favorited_park.id)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)
      create(:visit, user_id: user.id, skatepark_id: visited_park.id)

      favorites_and_visits = {
        favorite_parks: [favorited_park],
        visited_parks: [visited_park],
        both: [skatepark]
      }

      expect(user.favorites_and_visits).to eq(favorites_and_visits)
    end
  end
end
