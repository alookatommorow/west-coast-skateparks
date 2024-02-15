require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'PATCH #favorite' do
    it 'adds user to skatepark favoriters' do
      skatepark = create(:skatepark)
      user = create(:user)

      sign_in user

      patch "/skateparks/#{skatepark.slug}/favorite", params: { user_id: user.id }

      expect(response).to be_ok
      expect(skatepark.favoriters).to include user
    end
  end
end
