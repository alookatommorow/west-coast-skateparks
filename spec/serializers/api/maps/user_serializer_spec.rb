require 'rails_helper'

RSpec.describe Api::Maps::UserSerializer do
  describe '.serialze' do
    it 'returns user map JSON' do
      user = create(:user)
      skateparks = create_list(:skatepark, 3)

      user.favorites << skateparks.first
      user.visits << skateparks.second

      user.favorites << skateparks.third
      user.visits << skateparks.third

      expected = {
        collections: [
          {
            type: 'favorite',
            items: [serialize(skateparks.first)]
          },
          {
            type: 'visited',
            items: [serialize(skateparks.second)]
          },
          {
            type: 'both',
            items: [serialize(skateparks.third)]
          }
        ]
      }

      json = Api::Maps::UserSerializer.serialize(user)

      expect(json).to eq expected
    end
  end

  def serialize(skatepark)
    skatepark.as_json(only: %i[slug name city state latitude longitude rating])
             .merge(map_photo: skatepark.map_photo(:thumb))
  end
end
