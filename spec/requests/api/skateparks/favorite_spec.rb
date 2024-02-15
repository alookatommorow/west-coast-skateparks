require 'rails_helper'

RSpec.describe '/api/skateparks' do
  describe 'PATCH #favorite' do
    it 'adds user to skatepark favoriters' do
      skatepark = create(:skatepark)
      user = create(:user)

      patch "/api/skateparks/#{skatepark.slug}/favorite", params: { user_id: user.id }

      expect(response).to be_ok
      expect(skatepark.favoriters).to include user
    end
  end
end
