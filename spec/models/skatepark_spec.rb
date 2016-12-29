require 'rails_helper'

RSpec.describe Skatepark, type: :model do
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

  describe "#more_than_one_picture?" do
    it "returns true if skatepark has more than one picture" do
      skatepark = create(:skatepark)
      create(:skatepark_image, skatepark_id: skatepark.id)
      create(:skatepark_image, skatepark_id: skatepark.id)

      expect(skatepark.more_than_one_picture?).to eq(true)
    end

    it "returns false if skatepark has one or fewer pictures" do
      skatepark = create(:skatepark)
      create(:skatepark_image, skatepark_id: skatepark.id)

      expect(skatepark.more_than_one_picture?).to eq(false)
    end
  end

  describe "#to_param" do
    it "returns properly formatted param" do
      skatepark = create(:skatepark)

      expect(skatepark.to_param).to eq("#{skatepark.id}-#{skatepark.name}-#{skatepark.city}-#{skatepark.state}")
    end
  end
end
