require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #search' do
    it 'sets skateparks instance var with skateparks json' do
      mock_json = { wyd: 'chillin hard' }
      create_list(:skatepark, 2, state: 'california').sort_by(&:city)
      create(:skatepark, state: 'oregon')

      allow(Skateparks::SearchSerializer).to receive(:json).and_return mock_json

      expected = Array.new(Skatepark.count, mock_json)

      get '/skateparks/search'

      expect(assigns(:skateparks)).to eq expected
    end
  end
end
