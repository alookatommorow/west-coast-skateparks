require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET users/:id/map_data' do
    it 'serves JSON object with favorites, visits, and both' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.first.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.second.id)

      create(:favorite, user_id: user.id, skatepark_id: skateparks.third.id)
      create(:visit, user_id: user.id, skatepark_id: skateparks.third.id)

      expected = user.map_data.to_json

      get :map_data, id: user.id
      expect(response.body).to eq(expected)
    end
  end
end
