class FavoritesController < ApplicationController
  def create
    Favorite.create(
      user_id: params[:user_id],
      skatepark_id: params[:skatepark_id])

    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

  def update
    favorite = Favorite.where(
      user_id: params[:user_id],
      skatepark_id: params[:skatepark_id]).first
    Favorite.destroy(favorite.id) if favorite

    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end
end
