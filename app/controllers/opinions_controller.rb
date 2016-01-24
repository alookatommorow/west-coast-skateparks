class OpinionsController < ApplicationController
  def rate
    rating = Rating.find_by(id_params)
    if rating
      rating.update(rating: params[:rating])
    else
      Rating.create(rating_params)
    end
    redirect_to skatepark_path(params[:id])
  end

  def review
    review = Review.find_by(id_params)
    if review
      review.update(review: params[:review])
    else
      Review.create(review_params)
    end
    redirect_to skatepark_path(params[:id])
  end

  private

  def rating_params
    id_params.merge(rating: params[:rating])
  end

  def review_params
    id_params.merge(review: params[:review])
  end

  def id_params
    { user_id: params[:user_id],
      skatepark_id: params[:id] }
  end
end
