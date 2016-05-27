class ReviewsController < ApplicationController
  def create
    ManyToMany.create(Review, params)
    render partial: 'ajax-partials/reviews', locals: {
      skatepark: SkateparkPresenter.new(
        Skatepark.includes({ reviews: :user }).find(params[:skatepark_id])
      )
    }
  end
end