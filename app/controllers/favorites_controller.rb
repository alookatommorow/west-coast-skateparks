class FavoritesController < ApplicationController
  def create
    ManyToMany.create(Favorite, params)
    render nothing: true
  end

  def destroy
    ManyToMany.destroy(Favorite, params)
    render nothing: true
  end
end
