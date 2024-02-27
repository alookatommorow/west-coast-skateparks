require 'rails_helper'

RSpec.describe BaseSerializer do
  describe '.json' do
    it 'raises error' do
      skatepark = build_stubbed(:skatepark)

      expect { BaseSerializer.json(skatepark) }
        .to raise_error BaseSerializer::UndefinedAttributesError
    end

    context 'with inheritance' do
      let(:child_class) do
        Class.new(BaseSerializer) do
          class << self
            attributes :name, :city, :designer
          end
        end
      end

      it 'returns resource JSON with non-null attributes defined in child' do
        skatepark = build_stubbed(:skatepark)
        attributes = %i[name city]

        expected = skatepark.as_json(only: attributes)

        json = child_class.json(skatepark)

        expect(json).to eq expected
      end

      context 'with additional_attributes option' do
        it 'returns resource JSON with non-null attributes defined in child' do
          skatepark = build_stubbed(:skatepark)
          attributes = %i[name city]
          additional_attributes = { job: 'janitor' }

          expected = skatepark.as_json(only: attributes).merge(additional_attributes)

          json = child_class.json(skatepark, additional_attributes:)

          expect(json).to eq expected
        end
      end

      context 'with resource array' do
        it 'returns array of resource JSON' do
          skateparks = build_stubbed_pair(:skatepark)
          attributes = %i[name city]

          expected = skateparks.map { |park| park.as_json(only: attributes) }

          json = child_class.json(skateparks)

          expect(json).to eq expected
        end
      end

      context 'with active record relation' do
        it 'returns array of resource JSON' do
          skateparks = build_stubbed_pair(:skatepark)
          attributes = %i[name city]

          allow(skateparks).to receive(:is_a?).with(Array).and_return false
          allow(skateparks).to receive(:is_a?).with(ActiveRecord::Relation).and_return true

          expected = skateparks.map { |park| park.as_json(only: attributes) }

          json = child_class.json(skateparks)

          expect(json).to eq expected
        end
      end

      context 'with dynamic attribute' do
        let(:child_class) do
          Class.new(BaseSerializer) do
            class << self
              attributes :name, :obstacles

              def obstacles(skatepark)
                skatepark.obstacles.join(', ')
              end
            end
          end
        end

        it 'returns JSON containing result of calling dynamic attribute' do
          skatepark = build_stubbed(:skatepark, obstacles: ['rails, ledges, bowl'])

          expected = skatepark
                     .as_json(only: [:name])
                     .merge(obstacles: child_class.obstacles(skatepark))

          json = child_class.json(skatepark)

          expect(json).to eq expected
        end
      end
    end
  end
end
