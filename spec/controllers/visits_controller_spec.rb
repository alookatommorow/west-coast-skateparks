require 'rails_helper'

RSpec.describe VisitsController, type: :controller do

  describe '#create' do
    it 'creates a visit' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user.id

      expect(Visit.last.skatepark_id).to eq(skatepark.id)
      expect(Visit.last.user_id).to eq(user.id)
    end
  end

  describe '#update' do
    it 'destroys existing visit' do
      skatepark = create(:skatepark)
      user = create(:user)
      visit = create(:visit, user_id: user.id, skatepark_id: skatepark.id)

      put :update, skatepark_id: skatepark.id, user_id: user.id

      expect(Visit.last).to_not be(visit)
    end
  end
end