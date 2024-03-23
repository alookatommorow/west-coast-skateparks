require 'rails_helper'

RSpec.describe Skateparks::MapSerializer do
  it 'declares map attributes' do
    attributes = %i[slug name city state latitude longitude stars map_photo]

    expect(Skateparks::MapSerializer.new(nil).attributes).to eq attributes
  end

  describe '#serialize' do
    context 'with skatepark' do
      it 'returns skatepark map JSON' do
        skatepark = build_stubbed(:skatepark)
        neighbor_parks = build_stubbed_pair(:skatepark)

        skatepark_json = serialize(skatepark)
        neighbor_json = neighbor_parks.map { |n| serialize(n) }

        allow(skatepark).to receive(:neighbor_parks).and_return(neighbor_parks)

        expected = {
          main: [skatepark_json],
          nearby: neighbor_json
        }

        json = Skateparks::MapSerializer.new(skatepark).serialize

        expect(json).to eq expected
      end
    end

    context 'with user' do
      it "returns user's skateparks map JSON" do
        user = create(:user)
        skateparks = create_list(:skatepark, 3)
        favorites = [skateparks.first, skateparks.third]
        visits = [skateparks.second, skateparks.third]
        both = favorites & visits

        allow(user).to receive(:favorites).and_return(favorites)
        allow(user).to receive(:visits).and_return(visits)

        visits_json = visits.map { |n| serialize(n) }
        favorites_json = favorites.map { |n| serialize(n) }
        both_json = both.each_with_object({}) do |n, obj|
          obj[n.slug] = serialize n
        end

        expected = {
          favorite: favorites_json,
          visited: visits_json,
          both: both_json
        }

        json = Skateparks::MapSerializer.new(user).serialize

        expect(json).to eq expected
      end
    end

    def serialize(skatepark)
      skatepark.as_json(only: %i[slug name city state latitude longitude stars])
               .merge('map_photo' => Skatepark::MAP_PHOTO_DEFAULT_URL)
               .compact
    end
  end
end
