# All Administrate controllers inherit from this `Admin::ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_filters.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    before_filter :authenticate_admin

    def authenticate_admin
      unless admin_signed_in
        flash[:notice] = 'You need admin authentication to access that.'
        redirect_to new_session_path
      end
      # TODO Add authentication logic here.
    end

    private

      def admin_signed_in
        current_user && current_user.is_admin?
      end

      def current_user
        @current_user ||= User.where(id: session[:id]).first
      end

    # Override this value to specify the number of elements to display at a time
    # on index pages. Defaults to 20.
    # def records_per_page
    #   params[:per_page] || 20
    # end
  end
end
