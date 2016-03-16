class ReviewsController < ApplicationController
  def create
    ManyToMany.create(Review, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end
end