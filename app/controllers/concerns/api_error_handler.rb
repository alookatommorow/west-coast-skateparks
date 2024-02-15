module ApiErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :not_found
    rescue_from StandardError, with: :five_hundo
  end

  private

  def five_hundo
    render json: { message: 'Something went wrong' }, status: :internal_server_error
  end

  def not_found
    render json: { message: 'Requested resource not found' }, status: :not_found
  end
end
