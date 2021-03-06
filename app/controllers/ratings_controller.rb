class RatingsController < ApplicationController
  around_action :with_err_handling, only: :create

  def create
    rating = Rating.create!(rating_params)
    render json: rating, status: :created
  end

  private

  def rating_params
    {
      user_id:      params[:user_id],
      skatepark_id: params[:skatepark_id],
      stars:        params[:stars],
      review:       params[:review],
    }
  end

  def with_err_handling
    yield
  rescue StandardError => e
    Rails.logger.error "YA FUQCT SQUILLY UP #{e.class}: #{e.message}"
    render json: { error: "You FUQT UP: #{e.message}" }, status: :bad_request
  end
end
