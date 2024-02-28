require 'rails_helper'

RSpec.describe Skateparks::BaseSerializer do
  describe '#map_photo' do
    it 'returns map_photo thumb attribute' do
      skatepark = build_stubbed(:skatepark)

      map_photo = Skateparks::BaseSerializer.new(skatepark).map_photo

      expect(map_photo).to eq Skatepark::MAP_PHOTO_DEFAULT_URL
    end
  end

  describe '#obstacles' do
    it 'returns attr defined in method' do
      skatepark = build_stubbed(:skatepark, obstacles: ['rails, ledges, bowl'])

      obstacles = Skateparks::BaseSerializer.new(skatepark).obstacles

      expect(obstacles).to eq skatepark.obstacles.join(', ')
    end
  end
end
