require 'rails_helper'

RSpec.describe Skateparks::MapSerializer do
  describe '.for_skatepark' do
    it 'returns skatepark map JSON' do
      skatepark = build_stubbed(:skatepark)
      neighbor_parks = build_stubbed_pair(:skatepark)

      mock_json = { hey: 'what upple' }

      allow(skatepark).to receive(:neighbor_parks).and_return(neighbor_parks)
      allow(Skateparks::BaseSerializer).to receive(:json).and_return(mock_json)

      expected = {
        main: mock_json,
        collections: [
          {
            type: 'nearby',
            items: [mock_json, mock_json]
          }
        ]
      }

      json = Skateparks::MapSerializer.for_skatepark(skatepark)

      expect(json).to eq expected
    end
  end

  describe '.for_user' do
    it "returns user's skateparks map JSON" do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      user.favorites << skateparks.first
      user.visits << skateparks.second

      user.favorites << skateparks.third
      user.visits << skateparks.third

      mock_json = { hey: 'sup' }

      allow(Skateparks::BaseSerializer).to receive(:json).and_return(mock_json)

      expected = {
        collections: [
          {
            type: 'favorite',
            items: [mock_json]
          },
          {
            type: 'visited',
            items: [mock_json]
          },
          {
            type: 'both',
            items: [mock_json]
          }
        ]
      }

      json = Skateparks::MapSerializer.for_user(user)

      expect(json).to eq expected
    end
  end
end
