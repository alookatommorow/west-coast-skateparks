require 'rails_helper'

RSpec.describe VisitsController, type: :controller do

  describe '#create' do
    it 'creates a visit' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user.id

      expect(Visit.last.skatepark).to eq(skatepark)
      expect(Visit.last.user).to eq(user)
    end
  end

  describe '#update' do
    it 'destroys existing visit' do
      visit = create(:visit)

      delete :destroy, skatepark_id: visit.skatepark_id, user_id: visit.user_id

      expect(Visit.last).to_not be(visit)
    end
  end
end