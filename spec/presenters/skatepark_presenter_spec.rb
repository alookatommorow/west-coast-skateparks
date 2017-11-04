require 'rails_helper'

RSpec.describe SkateparkPresenter do
  describe '#attributes' do
    it 'returns formatted titleized skatepark attributes' do
      original_skatepark = create(:skatepark, :presentable)
      skatepark = SkateparkPresenter.new(original_skatepark)

      show_attributes = original_skatepark.attributes.slice('info', 'hours')
      titleized_attributes = {
        'material' => 'Bullshit Garbage',
        'builder' => 'Bob',
        'obstacles' => 'Poo Debris, Debris',
        'size' => '5000 sq ft' }
      expected_attributes = titleized_attributes.merge(show_attributes.select { |_k, v| v.present? })

      expect(skatepark.attributes).to eq(expected_attributes)
      expect(skatepark.attributes.key?('openend')).to eq(false)
    end
  end
end
