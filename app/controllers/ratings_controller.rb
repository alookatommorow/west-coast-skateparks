class RatingsController < ApplicationController
  def create
    ManyToMany.create(Rating, params)
    render partial: 'ajax-partials/reviews', locals: {
      skatepark: SkateparkPresenter.new(
        Skatepark.includes({ reviews: :user }, :ratings).find(params[:skatepark_id])
      )
    }
  end
end
