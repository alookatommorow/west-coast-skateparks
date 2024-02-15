require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'PATCH #unvisit' do
    it 'removes user from skatepark visitors' do
      skatepark = create(:skatepark)
      user = create(:user)
      skatepark.visitors << user

      sign_in user

      patch "/skateparks/#{skatepark.slug}/unvisit", params: { user_id: user.id }

      expect(response).to be_ok
      expect(skatepark.visitors).not_to include user
    end
  end
end
