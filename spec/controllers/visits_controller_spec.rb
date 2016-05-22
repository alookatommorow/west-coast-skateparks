require 'rails_helper'

RSpec.describe VisitsController, type: :controller do
  describe '#create' do
    it 'creates a visit' do
      skatepark = create(:skatepark)
      user = create(:user)
      session[:id] = user.id

      post :create, skatepark_id: skatepark.id

      expect(Visit.last.skatepark).to eq(skatepark)
      expect(Visit.last.user).to eq(user)
    end
  end

  describe '#update' do
    it 'destroys existing visit' do
      visit = create(:visit)
      session[:id] = create(:user).id

      delete :destroy, skatepark_id: visit.skatepark_id, id: visit.id

      expect(Visit.last).to_not be(visit)
    end
  end
end
