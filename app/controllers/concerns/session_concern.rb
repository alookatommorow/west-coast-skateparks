module SessionConcern
  extend ActiveSupport::Concern

  included do
    helper_method :current_user
    helper_method :logged_in?
  end

  def current_user
    @current_user ||= User.find_by(id: session[:id])
  end

  def logged_in?
    current_user.present?
  end
end
