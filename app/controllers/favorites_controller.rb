class FavoritesController < ApplicationController
  def create
    if logged_in?
      @favorite = Favorite.create(
        skatepark_id: params[:skatepark_id],
        user_id: current_user.id,
      )
      render_favorite_button
    else
      render nothing: true
    end
  end

  def destroy
    Favorite.destroy(params[:id])
    render_favorite_button
  end

  private

    def render_favorite_button
      render partial: 'button', locals: {
        favorite: @favorite,
        user: current_user.id,
        skatepark: Skatepark.find(params[:skatepark_id]),
      }
    end
end
