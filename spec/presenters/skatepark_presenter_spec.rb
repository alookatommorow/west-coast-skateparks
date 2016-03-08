require 'rails_helper'

RSpec.describe SkateparkPresenter do
  describe '#attributes' do
    it 'returns formatted titleized skatepark attributes' do
      original_skatepark = create(
        :skatepark, material: 'bullshit garbage', opened: nil, builder: 'bob', obstacles: 'poo debris, debris')
      skatepark = SkateparkPresenter.new(original_skatepark)

      show_attributes = original_skatepark.attributes.slice('address', 'info', 'hours')
      titleized_attributes = {
        'material' => 'Bullshit Garbage',
        'builder' => 'Bob',
        'obstacles' => 'Poo Debris, Debris' }
      expected_attributes = titleized_attributes.merge(show_attributes.select { |_k, v| v.present? })

      expect(skatepark.attributes).to eq(expected_attributes)
      expect(skatepark.attributes.key?('openend')).to eq(false)
    end
  end
end
