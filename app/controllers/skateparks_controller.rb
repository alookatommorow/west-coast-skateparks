class SkateparksController < ApplicationController
  def show
    @skatepark = SkateparkPresenter.new(
      Skatepark.includes(
        :users_who_reviewed,
        :users_who_rated).find(params[:id]))
  end

  def map_data
    skatepark = Skatepark.find(params[:id])
    render json: skatepark.map_data
  end
end
