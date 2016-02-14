class SkateparksController < ApplicationController
  def search
    render partial: 'search', locals: {
      skateparks: Skatepark.search(params[:search].downcase) }
  end

  def show
    @skatepark = Skatepark.includes(
      :users_who_reviewed,
      :users_who_rated).find(params[:id])
  end

  # skateparks by state via AJAX
  def state
    render partial: 'state', locals: {
      skateparks: Skatepark.in_state(params[:state]) }
  end

  def map_data
    skatepark = Skatepark.find(params[:id])
    render json: skatepark.map_data
  end

  private

    def skatepark_params
      params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
    end
end
