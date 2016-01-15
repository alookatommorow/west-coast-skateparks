require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  context '#already_favorited_by?' do
    it 'returns true if skatepark has been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      skatepark.users_who_faved << user

      expect(skatepark.already_favorited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been favorited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.already_favorited_by?(user)).to be false
    end
  end

  context '#already_visited_by?' do
    it 'returns true if skatepark has been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)
      skatepark.users_who_visited << user

      expect(skatepark.already_visited_by?(user)).to be true
    end

    it 'returns false if skatepark has not been visited by user' do
      user = create(:user)
      skatepark = create(:skatepark)

      expect(skatepark.already_visited_by?(user)).to be false
    end
  end

  context '#has_ratings?' do
    it 'returns true when a skatepark has ratings' do
      user = create(:user)
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)

      expect(skatepark.has_ratings?).to be true
    end
  end

  context '#has_reviews?' do
    it 'returns true when a skatepark has reviews' do
      user = create(:user)
      skatepark = create(:skatepark)

      Review.create(
        user_id: user.id, skatepark_id: skatepark.id, review: 'meh')

      expect(skatepark.has_reviews?).to be true
    end
  end

  context '#average_rating' do
    it 'returns the average of all ratings for a skatepark' do
      user = create(:user)
      guy = create(:user, username: 'guy', email: 'guy@guy.guy')
      girl = create(:user, username: 'girl', email: 'girl@girl.girl')
      skatepark = create(:skatepark)

      Rating.create(
        user_id: user.id, skatepark_id: skatepark.id, rating: 5)
      Rating.create(
        user_id: guy.id, skatepark_id: skatepark.id, rating: 3)
      Rating.create(
        user_id: girl.id, skatepark_id: skatepark.id, rating: 1)

      expect(skatepark.average_rating).to eq(3)
    end
  end
end
