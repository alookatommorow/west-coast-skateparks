require 'rails_helper'

RSpec.describe FavoritesController, type: :controller do

  describe '#create' do
    it 'creates a favorite' do
      skatepark = create(:skatepark)
      user = create(:user)

      post :create, skatepark_id: skatepark.id, user_id: user_id

      expect(Favorite.last.skatepark_id).to eq(skatepark_id)
      expect(Favorite.last.user_id).to eq(user_id)
    end
  end

end