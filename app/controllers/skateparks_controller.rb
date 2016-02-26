class SkateparksController < ApplicationController
  def search
    @skateparks = Skatepark.search(params[:search].downcase)
    render partial: 'search_results', locals: {
      skateparks: Skatepark.search(params[:search].downcase) }
  end

  def show
    @skatepark = Skatepark.includes(
      :users_who_reviewed,
      :users_who_rated).find(params[:id])
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
