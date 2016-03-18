require 'rails_helper'

RSpec.describe Skateparks::MapsController, type: :controller do
  describe '#show' do
    it 'serves JSON object with skatepark and nearby_parks' do
      skateparks = create_list(:skatepark, 2)
      expected = skateparks.first.map_data.to_json

      get :show, skatepark_id: skateparks.first.id
      expect(response.body).to eq(expected)
    end
  end
end