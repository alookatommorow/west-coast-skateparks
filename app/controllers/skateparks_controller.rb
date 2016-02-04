class SkateparksController < ApplicationController
  def search
    render partial: 'search', locals: {
      skateparks: Skatepark.search(params[:search].downcase) }
  end

  def show
    @skatepark = Skatepark.find(params[:id])
  end

  # skateparks by state via AJAX
  def state
    render partial: 'state', locals: {
      skateparks: Skatepark.in_state(params[:state]) }
  end

  private

  def skatepark_params
    params.require(:skatepark).permit(:name, :city, :state, :rating, :designer, :builder, :opened, :address, :hours, :size, :notes, :helmet)
  end


end
