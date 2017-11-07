class RatingsController < ApplicationController
  def create
    Rating.create(rating_params)

    render partial: "form", locals: {
      skatepark: Skatepark.includes(:ratings).find(params[:skatepark_id])
    }
  end

  private

    def rating_params
      {
        user_id: params[:user_id],
        skatepark_id: params[:skatepark_id],
        rating: params[:rating],
      }
    end
end
