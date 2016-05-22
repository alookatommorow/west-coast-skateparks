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

  def create_with_auth
    if params[:email].blank?
      flash.now[:error] = 'No email detected, please create an account or add email to your Facebook'
      render partial: 'flashes'
    else
      user = User.find_by_email(params[:email])
      user = User.create(auth_params) if user.nil?
      session[:id] = user.id
      render json: user.id
    end
  end

  def destroy
    logout
    redirect_to root_path, flash: { notice: BYE_MESSAGES.sample }
  end

  private

    def auth_params
      {
        name: params[:name],
        email: params[:email],
        username: params[:email],
        avatar: avatar,
        password: SecureRandom.hex(20) # or this
      }
    end

    def avatar
      URI.parse(params[:avatar]) if params[:avatar].present?
    end

    def login
      if user_authenticated?
        session[:id] = @user.id
        path = @user.admin? ? admin_root_path : @user
        redirect_to path, flash: { notice: "Welcome, #{@user.display_name}" }
      else
        redirect_to new_session_path, flash: { error: 'Sign in failed' }
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
