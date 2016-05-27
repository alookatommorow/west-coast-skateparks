class RatingsController < ApplicationController
  def create
    ManyToMany.create(Rating, params)
    render partial: 'ajax-partials/rating', locals: {
      skatepark: SkateparkPresenter.new(
        Skatepark.includes(:ratings).find(params[:skatepark_id])
      )
    }
  end
end
