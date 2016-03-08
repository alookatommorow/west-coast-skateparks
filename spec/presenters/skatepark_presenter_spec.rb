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

  context '#average_rating' do
    it 'returns the average of all ratings for a skatepark' do
      users = create_list(:user, 3)
      skatepark = SkateparkPresenter.new(create(:skatepark))

      users.each_with_index do |user, rating|
        Rating.create(
          user_id: user.id, skatepark_id: skatepark.id, rating: rating + 2)
      end

      expect(skatepark.average_rating).to eq(3)
    end

    it 'returns a prompt for users if skatepark has not been rated' do
      skatepark = SkateparkPresenter.new(create(:skatepark))

      expect(skatepark.average_rating).to eq('Be the first to rate!')
    end
  end
end
