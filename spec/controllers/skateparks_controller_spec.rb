require 'rails_helper'

RSpec.describe SkateparksController, type: :controller do
  describe '#map_data' do
    it 'serves JSON object with skatepark and nearby_parks' do
      skateparks = create_list(:skatepark, 2)
      expected = skateparks.first.map_data.to_json

      get :map_data, id: skateparks.first.id
      expect(response.body).to eq(expected)
    end
  end
end
