class FavoritesController < ApplicationController
  def create
    Favorite.create(favorite_params)
    render nothing: true
  end

  def update
    favorite = Favorite.find_by(favorite_params)
    Favorite.destroy(favorite.id) if favorite
    render nothing: true
  end

  private

    def favorite_params
      { user_id: params[:user_id],
        skatepark_id: params[:skatepark_id] }
    end
end
