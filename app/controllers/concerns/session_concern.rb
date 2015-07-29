module SessionConcern

  extend ActiveSupport::Concern

  included do
    # helper_method :login
  end

  def login
    @user = User.where(username: params[:username]).first
    p '*' * 100
    p @user
    p params[:password]
    p @user.password_digest
    p @user.authenticate(params[:password])
    p '*' * 100

    if @user && @user.authenticate(params[:password])
      session[:id] = @user.id
      redirect_to @user
    else
      redirect_to new_session_path
    end
  end

end
