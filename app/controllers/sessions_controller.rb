class SessionsController < ApplicationController
  def create
    login
  end

  def destroy
    logout && redirect_to(root_path)
  end

  private

    def login
      if user_authenticated?
        session[:id] = @user.id
        redirect_to @user.admin? ? admin_root_path : @user
      else
        redirect_to root_path, notice: 'Sign in failed'
      end
    end

    def logout
      session.clear
    end

    def user_authenticated?
      @user ||= User.where(username: params[:username]).first
      @user && @user.authenticate(params[:password])
    end
end
