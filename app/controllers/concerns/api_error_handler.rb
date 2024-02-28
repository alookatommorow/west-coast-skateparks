module ApiErrorHandler
  extend ActiveSupport::Concern
  class InvalidRequest < StandardError; end

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from InvalidRequest, with: :invalid_request
  end

  private

  def not_found
    render json: { message: 'Requested resource not found' }, status: :not_found
  end

  def invalid_request
    render json: { message: 'One or more parameters or parameter values invalid' }, status: :bad_request
  end
end
