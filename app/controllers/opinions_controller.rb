class OpinionsController < ApplicationController
  def rate
    Association.new(Rating, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end

  def review
    Association.new(Review, params)
    redirect_to skatepark_path(params[:skatepark_id])
  end
end
