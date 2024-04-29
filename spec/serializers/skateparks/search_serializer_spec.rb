require 'rails_helper'

RSpec.describe Skateparks::SearchSerializer do
  it 'declares map attributes' do
    attributes = %i[slug name city state map_photo stars obstacles]

    expect(Skateparks::SearchSerializer.new.attributes).to eq attributes
  end

  describe '#serialize' do
    it 'returns skatepark search JSON' do
      skatepark = build_stubbed(:skatepark)

      expected = serialize(skatepark)

      json = Skateparks::SearchSerializer.new(skatepark).serialize

      expect(json).to eq expected
    end

    def serialize(skatepark)
      skatepark.as_json(only: %i[slug name city state stars])
               .merge(
                 'obstacles' => skatepark.obstacles&.join(', '),
                 'map_photo' => Skatepark::MAP_PHOTO_DEFAULT_URL
               )
               .compact
    end
  end
end
