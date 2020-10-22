require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  describe 'validations' do
    it 'validates obstacles' do
      skatepark = build_stubbed(:skatepark, obstacles: ['fuck all'])

      expect(skatepark.valid?).to be false
      expect(skatepark.errors.messages[:whitelist_obstacles]).to eq(
        ["The obstacles are fucked"]
      )
    end
  end

  describe '#ratings?' do
    it 'returns true when a skatepark has ratings' do
      rating = create(:rating)

      expect(rating.skatepark.ratings?).to be true
    end
  end

  describe "#more_than_one_picture?" do
    it "returns true if skatepark has more than one picture" do
      skatepark = create(:skatepark)
      create_list(:skatepark_image, 2, skatepark: skatepark)

      expect(skatepark.more_than_one_picture?).to eq(true)
    end

    it "returns false if skatepark has one or fewer pictures" do
      skatepark = create(:skatepark)
      create(:skatepark_image, skatepark: skatepark)

      expect(skatepark.more_than_one_picture?).to eq(false)
    end
  end

  describe "#to_param" do
    it "returns properly formatted param" do
      skatepark = create(:skatepark)

      expect(skatepark.to_param).to eq("#{skatepark.name}-#{skatepark.city}-#{skatepark.state}")
    end
  end

  describe '#average_rating' do
    it 'returns the average of all ratings for a skatepark' do
      users = create_list(:user, 2)
      skatepark = create(:skatepark)

      users.each_with_index do |user, stars|
        create(
          :rating, user: user, skatepark: skatepark, stars: stars + 2
        )
      end

      expect(skatepark.average_rating).to eq(2.5)
    end

    it 'returns a nil if skatepark has not been rated' do
      skatepark = create(:skatepark)

      expect(skatepark.average_rating).to be nil
    end
  end
end
