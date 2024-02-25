require 'rails_helper'

RSpec.describe '/api/maps' do
  describe 'GET #index' do
    context 'with skatepark' do
      it 'returns skatepark map JSON' do
        skatepark = create(:skatepark)
        json = { main: 'y u suckin', collections: ['brown stuff'] }.to_json
        allow(Skateparks::MapSerializer).to receive(:for_skatepark)
          .with(skatepark).and_return json

        get "/api/maps/#{skatepark.id}", params: { resource_name: 'skatepark' }

        expect(response.body).to eq json
      end
    end

    context 'with user' do
      it 'returns user map JSON' do
        user = create(:user)
        json = { collections: ['tripe tacos'] }.to_json
        allow(Skateparks::MapSerializer).to receive(:for_user)
          .with(user).and_return json

        get "/api/maps/#{user.id}", params: { resource_name: 'user' }

        expect(response.body).to eq json
      end
    end

    context 'with invalid resource name' do
      it 'returns user map JSON' do
        user = create(:user)
        json = { message: 'One or more parameters or parameter values invalid' }.to_json
        allow(Skateparks::MapSerializer).to receive(:for_user)
          .with(user).and_return json

        get "/api/maps/#{user.id}", params: { resource_name: 'unsupported' }

        expect(response.body).to eq json
      end
    end
  end
end
