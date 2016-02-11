require 'rails_helper'

RSpec.describe User, type: :model do

  context '#dups' do
    it 'returns an array of skateparks in common between favorite and visited' do
      user = create(:user)
      favorite_park = create(:skatepark, identifier: "fantasyland")
      visited_park = create(:skatepark, identifier: "veggieland")
      both_park = create(:skatepark, identifier: "island")
      create(:favorite, user_id: user.id, skatepark_id: favorite_park.id)
      create(:visit, user_id: user.id, skatepark_id: visited_park.id)
      create(:visit, user_id: user.id, skatepark_id: both_park.id)
      create(:favorite, user_id: user.id, skatepark_id: both_park.id)

      expected = [both_park]

      expect(user.dups).to eq(expected)
    end
  end

  context '#map_data' do
    it 'returns a hash with data needed for map generation' do
      user = create(:user)
      favorite_park = create(:skatepark, identifier: "candyland")
      visited_park = create(:skatepark, identifier: "shroomland")
      both_park = create(:skatepark, identifier: "cherryland")
      create(:favorite, user_id: user.id, skatepark_id: favorite_park.id)
      create(:visit, user_id: user.id, skatepark_id: visited_park.id)
      create(:visit, user_id: user.id, skatepark_id: both_park.id)
      create(:favorite, user_id: user.id, skatepark_id: both_park.id)

      expected = {
        skateparks: {
          favorite: (user.favorite_parks - user.dups).map(&:hashify_with_pictures),
          visited: (user.visited_parks - user.dups).map(&:hashify_with_pictures),
          both: user.dups.map(&:hashify_with_pictures)
        },
        mapCenter: user.first_marker_coordinates,
        zoom: 6
      }

      expect(user.map_data).to eq(expected)
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

def safe_json(object)
  object.to_json.html_safe
end
