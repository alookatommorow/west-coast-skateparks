require 'rails_helper'

RSpec.describe ReviewsController, type: :controller do
  describe '#create' do
    it 'creates a review' do
      skatepark = create(:skatepark)
      user = create(:user)
      review = "This is really a fabulous scene. But it still sucks"

      post :create, params: {
        skatepark_id: skatepark.id, user_id: user.id, review: review
      }

      expect(Review.last.skatepark).to eq(skatepark)
      expect(Review.last.user).to eq(user)
      expect(Review.last.review).to eq(review)
    end
  end
end