require 'rails_helper'

RSpec.describe Skateparks::BaseSerializer do
  describe '.json' do
    it 'returns skatepark JSON' do
      skatepark = build_stubbed(:skatepark)

      expected = skatepark.as_json(only: %i[slug name city state latitude longitude stars]).compact

      json = Skateparks::BaseSerializer.json(skatepark)

      expect(json).to eq expected
    end

    context 'with inheritance' do
      before do
        child = Class.new(Skateparks::BaseSerializer)
        stub_const('Child', child)
      end

      it 'returns skatepark JSON for attributes defined in child' do
        skatepark = build_stubbed(:skatepark)
        attributes = %i[name city]

        stub_const('Child::ATTRIBUTES', attributes)

        expected = skatepark.as_json(only: attributes)

        json = Child.json(skatepark)

        expect(json).to eq expected
      end

      context 'with map_photo attr' do
        it 'returns attr defined in method' do
          thumb = 'url/of/photo'
          skatepark = build_stubbed(:skatepark)
          attributes = %i[name map_photo]

          allow(skatepark).to receive(:map_photo).with(:thumb).and_return(thumb)
          stub_const('Child::ATTRIBUTES', attributes)

          expected = skatepark.as_json(only: [:name]).merge(map_photo: thumb)

          json = Child.json(skatepark)

          expect(json).to eq expected
        end
      end

      context 'with obstacles attr' do
        it 'returns attr defined in method' do
          skatepark = build_stubbed(:skatepark, obstacles: ['rails, ledges, bowl'])
          attributes = %i[name obstacles]

          stub_const('Child::ATTRIBUTES', attributes)

          expected = skatepark.as_json(only: [:name]).merge(obstacles: skatepark.obstacles.join(', '))

          json = Child.json(skatepark)

          expect(json).to eq expected
        end
      end
    end
  end
end
