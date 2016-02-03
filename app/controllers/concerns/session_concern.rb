module SessionConcern

  extend ActiveSupport::Concern

  included do
    helper_method :current_user
    helper_method :logged_in?
  end

  def login
    if user_authenticated?
      session[:id] = @user.id
      redirect_to @user.is_admin? ? admin_root_path : @user
    else
      redirect_to new_session_path
    end
  end

  def logout
    session.clear
  end

  def current_user
    @current_user ||= User.where(id: session[:id]).first
  end

  def logged_in?
    !!current_user
  end

  def user_authenticated?
    @user = User.where(username: params[:username]).first
    @user && @user.authenticate(params[:password])
  end

end
