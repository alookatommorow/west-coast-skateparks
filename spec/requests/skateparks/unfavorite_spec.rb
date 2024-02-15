require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'PATCH #unfavorite' do
    it 'removes user from skatepark favoriters' do
      skatepark = create(:skatepark)
      user = create(:user)
      skatepark.favoriters << user

      sign_in user

      patch "/skateparks/#{skatepark.slug}/unfavorite", params: { user_id: user.id }

      expect(response).to be_ok
      expect(skatepark.favoriters).not_to include user
    end
  end
end
