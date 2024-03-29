# All Administrate controllers inherit from this `Admin::ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_filters.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_action :authenticate_admin

    def authenticate_admin
      return if admin_signed_in?

      flash[:notice] = 'You need admin authentication to access that.'
      redirect_to root_path
    end

    private

    def admin_signed_in?
      !!current_user&.admin?
    end

    def current_user
      @current_user ||= User.find_by(id: session[:id])
    end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end
  end
end
