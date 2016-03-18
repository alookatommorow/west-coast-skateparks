require 'rails_helper'

RSpec.describe Users::MapsController, type: :controller do
  describe '#show' do
    it 'serves JSON object with favorites, visits, and both' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      create(:favorite, user: user, skatepark: skateparks.first)
      create(:visit, user: user, skatepark: skateparks.second)

      create(:favorite, user: user, skatepark: skateparks.third)
      create(:visit, user: user, skatepark: skateparks.third)

      expected = user.map_data.to_json

      get :show, user_id: user.id
      expect(response.body).to eq(expected)
    end
  end
end