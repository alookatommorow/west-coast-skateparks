class FavoritesController < ApplicationController
  def create
    ManyToMany.create(Favorite, params)
    render nothing: true
  end

  def update # make this use associate
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
