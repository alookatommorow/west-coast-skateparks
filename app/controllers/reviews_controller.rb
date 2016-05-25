class ReviewsController < ApplicationController
  def create
    ManyToMany.create(Review, params)
    render partial: 'ajax-partials/reviews', locals: {
        skatepark: Skatepark.includes({ reviews: :user }).find(params[:skatepark_id])
      }
    # redirect_to skatepark_path(params[:skatepark_id])
  end
end