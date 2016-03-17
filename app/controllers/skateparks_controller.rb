class SkateparksController < ApplicationController
  def show
    @skatepark = SkateparkPresenter.new(
      Skatepark.includes(
        :users_who_reviewed,
        :users_who_rated).find(params[:id]))
  end

  def state
    render partial: 'state', locals: {
      skateparks: Skatepark.in_state(params[:state]) }
  end

  def map_data
    skatepark = Skatepark.find(params[:id])
    render json: skatepark.map_data
  end
end
