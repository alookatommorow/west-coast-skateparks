require 'rails_helper'

RSpec.describe RatingSerializer do
  describe '.avatar' do
    it 'returns user avater thumb attribute' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.avatar(rating)

      expect(avatar).to eq User::AVATAR_DEFAULT_URL
    end
  end

  describe '.author' do
    it 'returns stringified user' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.author(rating)

      expect(avatar).to eq user.to_s
    end
  end

  describe '.author_id' do
    it 'returns user id' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.author_id(rating)

      expect(avatar).to eq user.id
    end
  end

  describe '.created_at' do
    it 'returns human readable creation date' do
      rating = build_stubbed(:rating)

      avatar = RatingSerializer.created_at(rating)

      expect(avatar).to eq rating.created_at.strftime('%m/%d/%y')
    end
  end
end
