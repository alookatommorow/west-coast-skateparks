require 'rails_helper'

RSpec.describe '/api/maps' do
  describe 'GET #index' do
    context 'with Skatepark' do
      it 'returns skatepark map JSON' do
        skatepark = create(:skatepark)
        json = { main: 'y u suckin', collections: ['brown stuff'] }.to_json
        allow(Api::Maps::SkateparkSerializer).to receive(:serialize)
          .with(skatepark).and_return json

        get "/api/maps/#{skatepark.id}", params: { resource_name: 'skateparks' }

        expect(response.body).to eq json
      end
    end

    context 'with User' do
      it 'returns user map JSON' do
        user = create(:user)
        json = { collections: ['tripe tacos'] }.to_json
        allow(Api::Maps::UserSerializer).to receive(:serialize)
          .with(user).and_return json

        get "/api/maps/#{user.id}", params: { resource_name: 'users' }

        expect(response.body).to eq json
      end
    end
  end
end
