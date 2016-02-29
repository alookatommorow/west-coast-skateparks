require 'rails_helper'

RSpec.describe FavoritesController, type: :controller do

  describe '#create' do
    it 'creates a favorite' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user.id

      expect(Favorite.last.skatepark_id).to eq(skatepark.id)
      expect(Favorite.last.user_id).to eq(user.id)
    end
  end

  describe '#update' do
    it 'destroys existing favorite' do
      skatepark = create(:skatepark)
      user = create(:user)
      favorite = create(:favorite, user_id: user.id, skatepark_id: skatepark.id)

      put :update, skatepark_id: skatepark.id, user_id: user.id

      expect(Favorite.last).to_not be(favorite)
    end
  end
end