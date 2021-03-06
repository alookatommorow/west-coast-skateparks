class ReviewsController < ApplicationController
  def create
    Review.create!(review_params)

    head :ok
  end

  private

    def review_params
      {
        user_id: params[:user_id],
        skatepark_id: params[:skatepark_id],
        review: params[:review],
      }
    end
end
