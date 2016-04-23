require 'rails_helper'

RSpec.describe User, type: :model do
  context '#display_name' do
    it 'returns name if user has a name' do
      user = create(:user)

      expect(user.display_name).to eq(user.name)
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

      create(:favorite, user: user, skatepark: skateparks.first)
      create(:visit, user: user, skatepark: skateparks.second)

      create(:favorite, user: user, skatepark: skateparks.third)
      create(:visit, user: user, skatepark: skateparks.third)

      expect(user.dups).to eq([skateparks.third])
    end
  end

  context '#map_data' do
    it 'returns a hash with data needed for map generation' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      create(:favorite, user: user, skatepark: skateparks.first)
      create(:visit, user: user, skatepark: skateparks.second)

      create(:favorite, user: user, skatepark: skateparks.third)
      create(:visit, user: user, skatepark: skateparks.third)

      expect(user.map_data).to eq(
        skateparks: {
          favorite: (user.favorite_parks - user.dups).map(&:hashify_with_picture),
          visited: (user.visited_parks - user.dups).map(&:hashify_with_picture),
          both: user.dups.map(&:hashify_with_picture)
        },
        mapCenter: user.first_marker_coordinates,
        zoom: 6
      )
    end
  end

  context '#admin?' do
    it 'returns true if user is an admin' do
      user = build(:user, :admin)

      expect(user.admin?).to eq(true)
    end

    it 'returns false if user is not an admin' do
      user = build(:user)

      expect(user.admin?).to eq(false)
    end
  end

  context '#favorites?' do
    it 'returns true if user has favorites' do
      user = create(:favorite).user

      expect(user.favorites?).to eq(true)
    end

    it 'returns false if user does not have favorites' do
      user = build(:user)

      expect(user.favorites?).to eq(false)
    end
  end

  context '#visits?' do
    it 'returns true if user has visits' do
      user = create(:visit).user

      expect(user.visits?).to eq(true)
    end

    it 'returns false if user does not have visits' do
      user = build(:user)

      expect(user.visits?).to eq(false)
    end
  end

  context '#first_marker_coordinates' do
    it 'returns lat long of first favorited or visited skatepark' do
      user = create(:user)
      skateparks = create_list(:skatepark, 2)

      create(:visit, user: user, skatepark: skateparks.first)
      create(:favorite, user: user, skatepark: skateparks.second)

      expect(user.first_marker_coordinates).to eq(
        [skateparks.second.latitude, skateparks.second.longitude])
    end

    it 'returns SF EPICENTER if no park is found' do
      user = build(:user)

      expect(user.first_marker_coordinates).to eq([37.7833, -122.4167])
    end
  end

  context '#favorite_parks' do
    it "returns user's favorited parks" do
      user = create(:user)
      skatepark = create(:favorite, user: user).skatepark

      fav_park = user.favorite_parks.first
      expect(fav_park).to eq(skatepark)
    end
  end
end
