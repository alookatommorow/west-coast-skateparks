class OpinionsController < ApplicationController
  def rate
    exisiting_rating = Rating.where(
      user_id: params[:user_id],
      skatepark_id: params[:id]).first
    if exisiting_rating
      exisiting_rating.update_attributes(
        rating: params[:rating]
        )
    else
      Rating.create(
        user_id: params[:user_id],
        skatepark_id: params[:id],
        rating: params[:rating])
    end
    redirect_to skatepark_path(params[:id])
  end

  def review
    exisiting_review = Review.where(
      user_id: params[:user_id],
      skatepark_id: params[:id]).first
    if exisiting_review
      exisiting_review.update_attributes(
        review: params[:review]
        )
    else
      Review.create(
        user_id: params[:user_id],
        skatepark_id: params[:id],
        review: params[:review])
    end
    redirect_to skatepark_path(params[:id])
  end


end
