require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#display_name' do
    it 'returns name if user has a name' do
      user = create(:user)

      expect(user.display_name).to eq(user.name)
    end

    it 'returns username if user does not have a name' do
      user = create(:user, name: nil)

      expect(user.display_name).to eq(user.username)
    end
  end

  describe '#admin?' do
    it 'returns true if user is an admin' do
      user = build(:user, :admin)

      expect(user.admin?).to eq(true)
    end

    it 'returns false if user is not an admin' do
      user = build(:user)

      expect(user.admin?).to eq(false)
    end
  end

  describe '#visits?' do
    it 'returns true if user has visits' do
      user = create(:visit).user

      expect(user.visits?).to eq(true)
    end

    it 'returns false if user does not have visits' do
      user = build(:user)

      expect(user.visits?).to eq(false)
    end
  end
end
