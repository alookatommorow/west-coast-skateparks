class OpinionsController < ApplicationController
  def rate
    Association.create(Rating, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end

  def review
    Association.create(Review, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end
end
