require 'rails_helper'

RSpec.describe Skatepark, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:ratings).dependent(:destroy) }
    it { is_expected.to have_many(:skatepark_images).dependent(:destroy) }
    it { is_expected.to have_and_belong_to_many(:visitors).join_table(:visits).class_name('User').dependent(:destroy) }
    it {
      is_expected.to have_and_belong_to_many(:favoriters).join_table(:favorites).class_name('User').dependent(:destroy)
    }
  end

  describe 'validations' do
    subject { build_stubbed(:skatepark) }
    it { is_expected.to validate_numericality_of(:stars).is_in(1..5) }
    it { is_expected.to validate_presence_of(:city) }
    it { is_expected.to validate_presence_of(:state) }
    it { is_expected.to validate_inclusion_of(:state).in_array(Skatepark::STATES) }
    it { is_expected.to define_enum_for(:status).with_values(open: 0, closed: 1) }

    it 'validates obstacles' do
      skatepark = build_stubbed(:skatepark, obstacles: ['fuck all'])

      expect(skatepark.valid?).to be false
      expect(skatepark.errors.messages[:whitelist_obstacles]).to eq(
        ['The obstacles are fucked']
      )
    end

    it 'updates slug' do
      name = 'blarga124 clontark'
      skatepark = create(:skatepark)

      skatepark.update(name:)

      expect(skatepark.slug).to include name.parameterize
    end
  end

  describe '#ratings?' do
    it 'returns true when a skatepark has ratings' do
      rating = create(:rating)

      expect(rating.skatepark.ratings?).to be true
    end
  end

  describe '#to_param' do
    it 'returns properly formatted param' do
      skatepark = create(:skatepark)

      expect(skatepark.to_param).to eq("#{skatepark.name.parameterize}-#{skatepark.city.parameterize}-#{skatepark.state}")
    end
  end

  describe '#average_rating' do
    it 'returns the average of all ratings for a skatepark' do
      users = create_list(:user, 2)
      skatepark = create(:skatepark)

      users.each_with_index do |user, stars|
        create(
          :rating, user:, skatepark:, stars: stars + 2
        )
      end

      expect(skatepark.average_rating).to eq(2.5)
    end

    it 'returns a nil if skatepark has not been rated' do
      skatepark = create(:skatepark)

      expect(skatepark.average_rating).to be nil
    end
  end
end
