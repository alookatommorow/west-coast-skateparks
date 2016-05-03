class SkateparksController < ApplicationController
  def show
    @skatepark = SkateparkPresenter.new(
      Skatepark.includes({ reviews: :user }, :ratings).find(params[:id])
    )
  end
end
