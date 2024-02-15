require 'rails_helper'

RSpec.describe User do
  describe 'associations' do
    it { is_expected.to have_many :ratings }
    it { is_expected.to have_and_belong_to_many(:visits).join_table(:visits).class_name('Skatepark') }
    it { is_expected.to have_and_belong_to_many(:favorites).join_table(:favorites).class_name('Skatepark') }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_presence_of(:password).on(:create) }
    it { is_expected.to validate_uniqueness_of :email }
    it { is_expected.to validate_uniqueness_of :username }
  end

  describe '#favorited?' do
    context 'when user has favorited' do
      it 'returns true' do
        user = create(:user)
        skatepark = create(:skatepark)
        user.favorites << skatepark

        expect(user.favorited?(skatepark.id)).to be true
      end
    end

    context 'when user has not favorited' do
      it 'returns true' do
        user = create(:user)
        skatepark = create(:skatepark)

        expect(user.favorited?(skatepark.id)).to be false
      end
    end
  end

  describe '#visited?' do
    context 'when user has visited' do
      it 'returns true' do
        user = create(:user)
        skatepark = create(:skatepark)
        user.visits << skatepark

        expect(user.visited?(skatepark.id)).to be true
      end
    end

    context 'when user has not visited' do
      it 'returns true' do
        user = create(:user)
        skatepark = create(:skatepark)

        expect(user.visited?(skatepark.id)).to be false
      end
    end
  end
end
