require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET users/:id/map_data' do
    it 'serves JSON object with favorites, visits, and both' do
      user = create(:user)
      favorite_park = create(:skatepark, identifier: "candyland")
      visited_park = create(:skatepark, identifier: "shroomland")
      both_park = create(:skatepark, identifier: "cherryland")
      create(:favorite, user_id: user.id, skatepark_id: favorite_park.id)
      create(:visit, user_id: user.id, skatepark_id: visited_park.id)
      create(:visit, user_id: user.id, skatepark_id: both_park.id)
      create(:favorite, user_id: user.id, skatepark_id: both_park.id)

      expected = user.map_data.to_json

      get :map_data, id: user.id
      expect(response.body).to eq(expected)
    end
  end
end
