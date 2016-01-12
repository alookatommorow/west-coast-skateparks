class FavoritesController < ApplicationController
  def create
    favorite(params[:user_id], params[:skatepark_id])
    @skatepark = Skatepark.find(params[:skatepark_id])
    respond_to do |format|
      format.js
    end
  end

end