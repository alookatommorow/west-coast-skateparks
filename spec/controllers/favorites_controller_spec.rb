require 'rails_helper'

RSpec.describe FavoritesController, type: :controller do
  describe '#create' do
    it 'creates a favorite' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user.id

      expect(Favorite.last.skatepark).to eq(skatepark)
      expect(Favorite.last.user).to eq(user)
    end
  end

  describe '#update' do
    it 'destroys existing favorite' do
      favorite = create(:favorite)

      delete :destroy, skatepark_id: favorite.skatepark_id, user_id: favorite.user_id

      expect(Favorite.last).to_not be(favorite)
    end
  end
end