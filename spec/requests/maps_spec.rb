require "rails_helper"

RSpec.describe "Map data endpoint", type: :request do
  context "for Skatepark" do
    it "serves JSON object with skatepark and neighbor_parks" do
      skateparks = create_list(:skatepark, 2)
      expected = SkateparkSerializer.new(skateparks.first).to_json

      get map_path(skateparks.first, resource_name: "skateparks")

      expect(response.body).to eq(expected)
    end
  end

  context "for User" do
    it "serves JSON object with a User's favorites, visits, and both" do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      user.favorites << skateparks.first
      user.visits << skateparks.second

      user.favorites << skateparks.third
      user.visits << skateparks.third

      expected = UserSerializer.new(user).to_json

      get map_path(user, resource_name: "users")

      expect(response.body).to eq(expected)
    end
  end
end
