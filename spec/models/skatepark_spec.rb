require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  describe '#map_data' do
    it 'returns a hash with data needed for map generation' do
      skatepark = create_list(:skatepark, 2).first

      expected = {
        skateparks: {
          nearby: skatepark.nearby_parks.map(&:hashify_with_picture),
          main: [skatepark.hashify_with_picture],
        },
        mapCenter: [skatepark.latitude, skatepark.longitude],
        zoom: 9,
      }

      expect(skatepark.map_data).to eq(expected)
    end

    it 'assigns empty array as value of nearby key' do
      skatepark = create(:skatepark)

      expected = {
        skateparks: {
          nearby: [],
          main: [skatepark.hashify_with_picture],
        },
        mapCenter: [skatepark.latitude, skatepark.longitude],
        zoom: 9,
      }

      expect(skatepark.map_data).to eq(expected)
    end
  end

  describe "#hashify_with_picture" do
    it "returns a hash with skatepark data for map marker" do
      skatepark = create(:skatepark, rating: "2.5")

      expect(skatepark.hashify_with_picture).to eq(
        slug: skatepark.to_param,
        name: skatepark.name,
        city: skatepark.city,
        state: skatepark.state,
        latitude: skatepark.latitude,
        longitude: skatepark.longitude,
        picture: skatepark.map_photo(:thumb),
        rating: skatepark.rating
      )
    end
  end

  describe '#nearby_parks' do
    it 'returns an array of nearby skateparks' do
      skatepark = create(:skatepark)
      nearby_park = create(:skatepark, :nearby)
      far_far_away = create(:skatepark, :far)

      expect(skatepark.nearby_parks).to include(nearby_park)
      expect(skatepark.nearby_parks).to_not include(far_far_away)
    end
  end

  describe '#favorited_by?' do
    it 'returns true if skatepark has been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      expect(skatepark.favorited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.favorited_by?(user)).to be false
    end
  end

  describe '#visited_by?' do
    it 'returns true if skatepark has been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      expect(skatepark.visited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.visited_by?(user)).to be false
    end
  end

  describe '#ratings?' do
    it 'returns true when a skatepark has ratings' do
      user = create(:user)
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)

      expect(skatepark.ratings?).to be true
    end
  end

  describe '#reviews?' do
    it 'returns true when a skatepark has reviews' do
      user = create(:user)
      skatepark = create(:skatepark)

      Review.create(
        user_id: user.id, skatepark_id: skatepark.id, review: 'meh')

      expect(skatepark.reviews?).to be true
    end
  end

  describe "#next_park" do
    it "returns the next skatepark" do
      next_park = create(:skatepark, :washington, name: "bangcock")
      skatepark = create(:skatepark)

      expect(skatepark.next_park).to eq(next_park)
    end

    it "returns first skatepark if no next skatepark" do
      skatepark = create(:skatepark)

      expect(skatepark.next_park).to eq(skatepark)
    end
  end

  describe "#previous_park" do
    it "returns the previous skatepark" do
      skatepark = create(:skatepark, :oregon, name: "Xulu Testicle")
      previous_park = create(:skatepark)

      expect(skatepark.previous_park).to eq(previous_park)
    end

    it "returns last skatepark if no previous skatepark" do
      skatepark = create(:skatepark)

      expect(skatepark.previous_park).to eq(skatepark)
    end
  end
end
