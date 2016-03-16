require 'rails_helper'

RSpec.describe RatingsController, type: :controller do

  describe '#create' do
    it 'creates a rating' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user.id, rating: 5

      expect(Rating.last.skatepark).to eq(skatepark)
      expect(Rating.last.user).to eq(user)
      expect(Rating.last.rating).to eq(5)
    end
  end

  # describe '#review' do
  #   it 'creates a review' do
  #     skatepark = create(:skatepark)
  #     user = create(:user)
  #     review = "This is really a fabulous scene. But it still sucks"

  #     post :review, skatepark_id: skatepark.id, user_id: user.id, review: review

  #     expect(Review.last.skatepark_id).to eq(skatepark.id)
  #     expect(Review.last.user_id).to eq(user.id)
  #     expect(Review.last.review).to eq(review)
  #   end
  # end
end