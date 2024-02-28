require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #search' do
    it 'sets skateparks instance var with skateparks json' do
      mock_json = [{ wyd: 'chillin hard' }]
      create_list(:skatepark, 2, state: 'california').sort_by(&:city)
      create(:skatepark, state: 'oregon')
      serializer = instance_double(Skateparks::SearchSerializer)

      allow(Skateparks::SearchSerializer).to receive(:new).and_return(serializer)
      allow(serializer).to receive(:serialize).and_return(mock_json)

      get '/skateparks/search'

      expect(assigns(:skateparks)).to eq mock_json
    end
  end
end
