require 'rails_helper'

RSpec.describe Skateparks::MapsController, type: :controller do
  describe '#show' do
    it 'serves JSON object with skatepark and neighbor_parks' do
      skateparks = create_list(:skatepark, 2)
      expected = {
        skatepark: SkateparkSerializer.new(skateparks.first),
        zoom: 9,
      }.to_json

      get :show, params: {
        skatepark_id: skateparks.first.id
      }
      expect(response.body).to eq(expected)
    end
  end
end
