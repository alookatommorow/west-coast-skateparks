class FavoritesController < ApplicationController
  def create
    Favorite.create(favorite_params)

    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

  def update
    favorite = Favorite.find_by(favorite_params)
    Favorite.destroy(favorite.id) if favorite

    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

  private

    def favorite_params
      { user_id: params[:user_id],
        skatepark_id: params[:skatepark_id] }
    end
end
