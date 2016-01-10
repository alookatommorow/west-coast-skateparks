class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  include SessionConcern
  include SkateparkConcern
  include Geokit::Geocoders
  skip_before_action :verify_authenticity_controller

=begin
  if Rails.env.test?
    protect_from_forgery with: :null_session
  else
    protect_from_forgery with: :exception
  end
=end
end
