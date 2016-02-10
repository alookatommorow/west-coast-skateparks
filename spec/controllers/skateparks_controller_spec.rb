require 'rails_helper'

RSpec.describe SkateparksController, type: :controller do
  describe 'GET skateparks/:id/map_data' do
    it 'serves JSON object with skatepark and nearby_parks' do
      skatepark = create(:skatepark)
      nearby_skatepark = create(:skatepark, identifier: "alternate")
      expected = skatepark.map_data.to_json

      get :map_data, id: skatepark.id
      expect(response.body).to eq(expected)
    end
  end
end
