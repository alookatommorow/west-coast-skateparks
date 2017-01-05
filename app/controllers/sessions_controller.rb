class SessionsController < ApplicationController
  BYE_MESSAGES = [
    'Shred on brashiki',
    'LAYYYYTTTERRRRRR',
    'Grip it and rip it',
    "Go terrorize some 'crete!",
  ].freeze

  def new
  end

  def create
    login
  end

  def destroy
    logout
    redirect_to root_path, flash: { notice: BYE_MESSAGES.sample }
  end

  private

    def login
      if user_authenticated?
        session[:id] = @user.id
        path = @user.admin? ? admin_root_path : @user
        redirect_to path, flash: { notice: "Welcome, #{@user}" }
      else
        redirect_to new_session_path, flash: { error: 'Sign in failed' }
      end
    end

    def logout
      session.clear
    end

    def user_authenticated?
      @user ||= User.where(username: session_params[:username]).first
      @user && @user.authenticate(session_params[:password])
    end

    def session_params
      params.require(:session).permit(:username, :password)
    end
end
