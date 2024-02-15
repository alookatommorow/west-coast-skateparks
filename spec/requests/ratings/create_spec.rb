require 'rails_helper'

RSpec.describe '/ratings' do
  describe 'POST #create' do
    it 'creates a rating' do
      skatepark = create(:skatepark)
      user = create(:user)
      stars = 5

      post '/ratings', params: {
        skatepark_id: skatepark.id, user_id: user.id, stars:
      }

      rating = Rating.last

      expect(rating.skatepark).to eq(skatepark)
      expect(rating.user).to eq(user)
      expect(rating.stars).to eq(5)
      expect(json_body['stars']).to eq stars
      expect(json_body['new_average']).to eq skatepark.average_rating
    end
  end
end
