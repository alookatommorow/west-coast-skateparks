require 'rails_helper'

RSpec.describe OpinionsController, type: :controller do

  describe '#rate' do
    it 'creates a rating' do
      skatepark = create(:skatepark)
      user = create(:user)
      rating = 5

      post :rate, skatepark_id: skatepark.id, user_id: user.id, rating: rating

      expect(Rating.last.skatepark_id).to eq(skatepark.id)
      expect(Rating.last.user_id).to eq(user.id)
      expect(Rating.last.rating).to eq(rating)
    end
  end

  describe '#review' do
    it 'creates a review' do
      skatepark = create(:skatepark)
      user = create(:user)
      review = "This is really a fabulous scene. But it still sucks"

      post :review, skatepark_id: skatepark.id, user_id: user.id, review: review

      expect(Review.last.skatepark_id).to eq(skatepark.id)
      expect(Review.last.user_id).to eq(user.id)
      expect(Review.last.review).to eq(review)
    end
  end
end