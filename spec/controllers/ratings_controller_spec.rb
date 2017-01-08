require 'rails_helper'

RSpec.describe RatingsController, type: :controller do
  describe '#create' do
    it 'creates a rating' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, params: {
        skatepark_id: skatepark.id, user_id: user.id, rating: 5
      }

      expect(Rating.last.skatepark).to eq(skatepark)
      expect(Rating.last.user).to eq(user)
      expect(Rating.last.rating).to eq(5)
    end
  end
end