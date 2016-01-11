class VisitsController < ApplicationController
  def create
    visit(params[:user_id], params[:skatepark_id])
    user_has_skatepark(current_user.id, params[:skatepark_id])
    @skatepark_id = params[:skatepark_id]

    # this renders /_create.html.erb
    respond_to { |format| format.js }
  end

  def update
    visit(params[:user_id], params[:skatepark_id])
    @skatepark = Skatepark.find(params[:skatepark_id])

    respond_to { |format| format.js }
  end
end
