require 'rails_helper'

RSpec.describe BaseSerializer do
  describe '#serialize' do
    it 'raises error' do
      skatepark = build_stubbed(:skatepark)

      expect { BaseSerializer.new(skatepark).serialize }
        .to raise_error BaseSerializer::UndefinedAttributesError
    end

    context 'with inheritance' do
      let(:child_class) do
        Class.new(BaseSerializer) do
          attributes :name, :city, :designer
        end
      end

      it 'returns resource JSON with non-null attributes defined in child' do
        skatepark = build_stubbed(:skatepark)
        attributes = %i[name city]

        expected = skatepark.as_json(only: attributes)

        json = child_class.new(skatepark).serialize

        expect(json).to eq expected
      end

      context 'with additional_attributes option' do
        it 'returns resource JSON with non-null attributes defined in child' do
          skatepark = build_stubbed(:skatepark)
          attributes = %i[name city]
          additional_attributes = { job: 'janitor' }

          expected = skatepark.as_json(only: attributes).merge(additional_attributes)

          json = child_class.new(skatepark, additional_attributes:).serialize

          expect(json).to eq expected
        end
      end

      context 'with resource array' do
        it 'returns array of resource JSON' do
          skateparks = build_stubbed_pair(:skatepark)
          attributes = %i[name city]

          expected = skateparks.map { |park| park.as_json(only: attributes) }

          json = child_class.new(skateparks).serialize

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

          json = child_class.new(skateparks).serialize

          expect(json).to eq expected
        end
      end

      context 'with dynamic attribute' do
        let(:child_class) do
          Class.new(BaseSerializer) do
            attributes :name, :obstacles

            def obstacles(skatepark)
              skatepark.obstacles&.join(', ')
            end
          end
        end

        it 'returns JSON containing result of calling dynamic attribute' do
          skatepark = build_stubbed(:skatepark, obstacles: ['rails, ledges, bowl'])

          expected = skatepark
                     .as_json(only: [:name])
                     .merge(obstacles: child_class.new(skatepark).obstacles(skatepark))

          json = child_class.new(skatepark).serialize

          expect(json).to eq expected
        end

        context 'when dynamic attribute is nil' do
          it 'returns does not include attribute' do
            skatepark = build_stubbed(:skatepark)

            expected = skatepark.as_json(only: [:name])

            json = child_class.new(skatepark).serialize

            expect(json).to eq expected
          end
        end
      end
    end
  end
end
