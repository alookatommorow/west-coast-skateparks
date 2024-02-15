require 'rails_helper'

RSpec.describe '/maps' do
  describe 'GET #index' do
    context 'for Skatepark' do
      it 'serves JSON with skatepark and neighbor_parks' do
        skatepark = create(:skatepark)
        expected = SkateparkSerializer.new(skatepark).to_json

        get "/maps/#{skatepark.id}", params: { resource_name: 'skateparks' }

        expect(response.body).to eq(expected)
      end
    end

    context 'for User' do
      it "serves JSON with a User's favorites, visits, and both" do
        user = create(:user)
        skateparks = create_list(:skatepark, 3)

        user.favorites << skateparks.first
        user.visits << skateparks.second

        user.favorites << skateparks.third
        user.visits << skateparks.third

        expected = UserSerializer.new(user).to_json

        get "/maps/#{user.id}", params: { resource_name: 'users' }

        expect(response.body).to eq(expected)
      end
    end
  end
end
