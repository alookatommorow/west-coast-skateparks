module SessionConcern

  extend ActiveSupport::Concern

  included do
    helper_method :current_user
    helper_method :logged_in?
  end

  def login
    @user = User.where(username: params[:username]).first
    if @user && @user.authenticate(params[:password])
      session[:id] = @user.id
      redirect_to @user
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

end
