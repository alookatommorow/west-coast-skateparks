class SessionsController < ApplicationController
  def create
    login
  end

  def create_with_fb_auth
    ap params.merge(auth_params)
    @user = User.find_by_uid(params[:id])
    unless @user
      @user = User.create(fb_params.merge(auth_params))
    end
    session[:id] = @user.id
    render json: @user.id
  end

  def create_with_google_auth
    @user = User.find_by_email(params[:email])
    unless @user
      @user = User.create(google_params.merge(auth_params))
    end
    session[:id] = @user.id
    render json: @user.id
  end

  def destroy
    logout
    redirect_to root_path, flash: { notice: bye_message }
  end

  private

    def auth_params
      {
        name: params[:name],
        username: "#{SecureRandom.hex(9)}#{params[:name].gsub(/\s/, '')}",
        password: SecureRandom.hex(20)
      }
    end

    def google_params
      { email: params[:email] }
    end

    def fb_params
      {
        email: "#{params[:name].gsub(/\s/, '')}#{SecureRandom.hex(9)}@shred.net",
        uid: params[:id],
      }
    end

    def login
      if user_authenticated?
        session[:id] = @user.id
        path = @user.admin? ? admin_root_path : @user
        redirect_to path, flash: { notice: "Welcome, #{@user.display_name}" }
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
      ['Shred on brashiki', 'LAYYYYTTTERRRRRR', 'Grip it and rip it', "Go terrorize some 'crete"].sample
    end
end
