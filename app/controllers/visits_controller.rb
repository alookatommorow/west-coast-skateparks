class VisitsController < ApplicationController
  def create
    Visit.create(
      user_id: params[:user_id],
      skatepark_id: params[:skatepark_id])
    render nothing: true
  end

  def update
    visit = Visit.where(
      user_id: params[:user_id],
      skatepark_id: params[:skatepark_id]).first
    Visit.destroy(visit.id) if visit
    @skatepark = Skatepark.find(params[:skatepark_id])

    respond_to { |format| format.js }
  end
end
