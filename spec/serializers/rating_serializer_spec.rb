require 'rails_helper'

RSpec.describe RatingSerializer do
  it 'declares rating attributes' do
    attributes = %i[stars review avatar author author_id created_at]

    expect(RatingSerializer.new(nil).attributes).to eq attributes
  end

  describe '#avatar' do
    it 'returns user avater thumb attribute' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.new(rating).avatar

      expect(avatar).to eq User::AVATAR_DEFAULT_URL
    end
  end

  describe '#author' do
    it 'returns stringified user' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.new(rating).author

      expect(avatar).to eq user.to_s
    end
  end

  describe '#author_id' do
    it 'returns user id' do
      user = build_stubbed(:user)
      rating = build_stubbed(:rating, user:)

      avatar = RatingSerializer.new(rating).author_id

      expect(avatar).to eq user.id
    end
  end

  describe '#created_at' do
    it 'returns human readable creation date' do
      rating = build_stubbed(:rating)

      avatar = RatingSerializer.new(rating).created_at

      expect(avatar).to eq rating.created_at.strftime('%m/%d/%y')
    end
  end
end
