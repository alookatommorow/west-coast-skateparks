require 'rails_helper'

RSpec.describe UserSerializer do
  it 'declares rating attributes' do
    attributes = %i[id username name email created_at avatar]

    expect(UserSerializer.new(nil).attributes).to eq attributes
  end

  describe '#avatar' do
    it 'returns user avatar url' do
      user = build_stubbed(:user)

      avatar = UserSerializer.new(user).avatar

      expect(avatar).to eq user.avatar.url
    end
  end

  describe '#created_at' do
    it 'returns stringified user' do
      user = build_stubbed(:user)

      created_at = UserSerializer.new(user).created_at

      expect(created_at).to eq user.created_at.strftime('%Y')
    end
  end
end
