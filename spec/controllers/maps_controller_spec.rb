require "rails_helper"

RSpec.describe MapsController, type: :controller do
  describe "#show" do
    context "on Skatepark page" do
      it "serves JSON object with skatepark and neighbor_parks" do
        skateparks = create_list(:skatepark, 2)
        expected = SkateparkSerializer.new(skateparks.first).to_json

        get :show, params: {
          id: skateparks.first.id,
          resource_name: "skateparks",
        }

        expect(response.body).to eq(expected)
      end
    end

    context "on User page" do
      it "serves JSON object with a User's favorites, visits, and both" do
        user = create(:user)
        skateparks = create_list(:skatepark, 3)

        user.favorites << skateparks.first
        user.visits << skateparks.second

        user.favorites << skateparks.third
        user.visits << skateparks.third

        expected = UserSerializer.new(user).to_json

        get :show, params: {
          id: user.id,
          resource_name: "users",
        }

        expect(response.body).to eq(expected)
      end
    end
  end
end
