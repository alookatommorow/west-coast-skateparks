class OpinionsController < ApplicationController
  def rate
    rate_skatepark(params[:user_id], params[:id], params[:rating])
    redirect_to skatepark_path(params[:id])
  end

  def review
    username = User.find(params[:user_id]).username

    review_skatepark(params[:user_id], params[:id], params[:review], username)
    redirect_to skatepark_path(params[:id])
  end
end
