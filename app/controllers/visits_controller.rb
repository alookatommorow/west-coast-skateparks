class VisitsController < ApplicationController
  def create
    p '*' * 100
    p params[:user_id]
    p '*' * 100
    visit(params[:user_id], params[:skatepark_id])
    user_has_skatepark(current_user.id, params[:skatepark_id])
    @skatepark_id = params[:skatepark_id]
    # @skatepark = Skatepark.find(params[:id])
    # this renders /_create.html.erb
    respond_to { |format| format.js }
  end
end
