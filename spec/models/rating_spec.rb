require 'rails_helper'

RSpec.describe Rating do
  describe 'validations' do
    describe 'two_per_user_per_park' do
      it 'enforces 2 rating max per user per park' do
        user = create(:user)
        skatepark = create(:skatepark)
        create_list(:rating, 2, user:, skatepark:)

        rating = build(:rating, user:, skatepark:)

        expect(rating.valid?).to be false
        expect(rating.errors.full_messages).to eq ["User can't have more than two ratings per park"]
      end
    end
  end
end
