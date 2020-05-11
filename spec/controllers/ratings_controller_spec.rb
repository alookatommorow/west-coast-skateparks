require 'rails_helper'

RSpec.describe RatingsController, type: :controller do
  describe '#create' do
    it 'creates a rating' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, params: {
        skatepark_id: skatepark.id, user_id: user.id, stars: 5
      }

      rating = Rating.last
      json_response = JSON.parse(response.body)

      expect(rating.skatepark).to eq(skatepark)
      expect(rating.user).to eq(user)
      expect(rating.stars).to eq(5)
      expect(json_response['stars']).to eq 5
      expect(json_response['new_average']).to eq skatepark.average_rating
    end
  end
end