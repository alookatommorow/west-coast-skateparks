class SessionsController < ApplicationController
  def create
    login
  end

  def destroy
    logout
    redirect_to root_path, flash: { notice: bye_message }
  end

  private

    def login
      if user_authenticated?
        session[:id] = @user.id
        path = @user.admin? ? admin_root_path : @user
        redirect_to path, flash: { notice: "Welcome back, #{@user.username}" }
      else
        redirect_to root_path, flash: { error: 'Sign in failed' }
      end
    end

    def logout
      session.clear
    end

    def user_authenticated?
      @user ||= User.where(username: params[:username]).first
      @user && @user.authenticate(params[:password])
    end

    def bye_message
      ['Shred on brashiki', 'LAYYYYTTTERRRRRR'].sample
    end
end
