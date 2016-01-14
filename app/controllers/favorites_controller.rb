class FavoritesController < ApplicationController
  def create
    # favorite(params[:user_id], params[:skatepark_id])
    favorited_already = Favorite.where(
      user_id: params[:user_id],
      skatepark_id: params[:skatepark_id])

    unless favorited_already
      Favorite.create(
        user_id: params[:user_id],
        skatepark_id: params[:skatepark_id])
    end

    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

  def update
    favorite(params[:user_id], params[:skatepark_id])
    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

end
