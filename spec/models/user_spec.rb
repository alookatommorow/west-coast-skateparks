require 'rails_helper'

RSpec.describe User, type: :model do
  context '#display_name' do
    it 'returns name if user has a name' do
      user = create(:user, name: 'Turd Furgeson')

      expect(user.display_name).to eq('Turd Furgeson')
    end

    it 'returns username if user does not have a name' do
      user = create(:user, name: nil)

      expect(user.display_name).to eq(user.username)
    end
  end

  context '#dups' do
    it 'returns an array of skateparks in common between favorite and visited' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.first.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.second.id)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.third.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.third.id)

      expected = [skateparks.third]
      expect(user.dups).to eq(expected)
    end
  end

  context '#map_data' do
    it 'returns a hash with data needed for map generation' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.first.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.second.id)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.third.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.third.id)

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

  context '#admin?' do
    it 'returns true if user is an admin' do
      user = create(:user, :admin)

      expect(user.admin?).to eq(true)
    end

    it 'returns false if user is not an admin' do
      user = create(:user)

      expect(user.admin?).to eq(false)
    end
  end

  context '#favorites?' do
    it 'returns true if user has favorites' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.favorites?).to eq(true)
    end

    it 'returns false if user does not have favorites' do
      user = create(:user)

      expect(user.favorites?).to eq(false)
    end
  end

  context '#visits?' do
    it 'returns true if user has visits' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(user.visits?).to eq(true)
    end

    it 'returns false if user does not have visits' do
      user = create(:user)

      expect(user.visits?).to eq(false)
    end
  end

  context '#first_marker_coordinates' do
    it 'returns lat long of first favorited or visited skatepark' do
      user = create(:user)
      skateparks = create_list(:skatepark, 2)

      create(:visit, user_id: user.id, skatepark_id: skateparks.first.id)
      create(:favorite, user_id: user.id, skatepark_id: skateparks.second.id)

      expect(user.first_marker_coordinates).to eq(
        [skateparks.second.latitude, skateparks.second.longitude])
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
