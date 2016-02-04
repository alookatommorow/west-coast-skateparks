require 'rails_helper'

RSpec.describe User, type: :model do
  context '#favorite_parks_json' do
    it 'returns favorite parks converted to json' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.favorite_parks_json).to eq([skatepark.map_json])
    end

    it 'does not return favorites that have also been visited' do
      user = create(:user)
      skatepark = create(:skatepark)
      other_park = create(:skatepark, identifier: 'genius')
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)
      create(:favorite, user_id: user.id, skatepark_id: other_park.id)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.favorite_parks_json).to eq([other_park.map_json])
    end

    it 'returns an empty array if no favorites' do
      user = create(:user)

      expect(user.favorite_parks_json).to eq([])
    end
  end

  context '#visited_parks_json' do
    it 'returns visited parks converted to json' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.visited_parks_json).to eq([skatepark.map_json])
    end

    it 'does not return visits that have also been favorited' do
      user = create(:user)
      skatepark = create(:skatepark)
      other_park = create(:skatepark, identifier: 'genius')
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)
      create(:visit, user_id: user.id, skatepark_id: other_park.id)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.visited_parks_json).to eq([other_park.map_json])
    end

    it 'returns an empty array if no visits' do
      user = create(:user)

      expect(user.visited_parks_json).to eq([])
    end
  end

  context '#both_json' do
    it 'returns json array of parks that have been favorited and visited' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.both_json).to eq([skatepark.map_json])
    end

    it 'returns an empty array if no fav-visits' do
      user = create(:user)
      skatepark = create(:skatepark)
      other_park = create(:skatepark, identifier: 'swagdaddy')
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)
      create(:visit, user_id: user.id, skatepark_id: other_park.id)

      expect(user.both_json).to eq([])
    end
  end

  context '#is_admin?' do
    it 'returns true if user is an admin' do
      user = create(:user, admin: true)

      expect(user.is_admin?).to eq(true)
    end

    it 'returns false if user is not an admin' do
      user = create(:user)

      expect(user.is_admin?).to eq(false)
    end
  end

  context '#has_favorites?' do
    it 'returns true if user has favorites' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.has_favorites?).to eq(true)
    end

    it 'returns false if user does not have favorites' do
      user = create(:user)

      expect(user.has_favorites?).to eq(false)
    end
  end

  context '#has_visits?' do
    it 'returns true if user has visits' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.has_visits?).to eq(true)
    end

    it 'returns false if user does not have visits' do
      user = create(:user)

      expect(user.has_visits?).to eq(false)
    end
  end

  context '#first_marker_coordinates' do
    it 'returns lat long of first favorited or visited skatepark' do
      user = create(:user)
      skatepark = create(:skatepark)
      other = create(:skatepark, :other)

      create(:visit, user_id: user.id, skatepark_id: skatepark.id)
      create(:favorite, user_id: user.id, skatepark_id: other.id)

      expect(user.first_marker_coordinates).to eq([other.latitude, other.longitude])
    end

    it 'returns SF EPICENTER if no park is found' do
      user = create(:user)

      expect(user.first_marker_coordinates).to eq([37.7833, -122.4167])
    end
  end

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
end
