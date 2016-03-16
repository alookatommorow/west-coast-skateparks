class RatingsController < ApplicationController
  def create
    ManyToMany.create(Rating, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end

  def review
    ManyToMany.create(Review, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end
end