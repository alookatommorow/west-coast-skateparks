class SessionsController < ApplicationController
  def create
    login
  end

  def create_with_auth
    @user = User.find_by_uid(params[:id])
    unless @user
      @user = User.create(user_params)
    end
    session[:id] = @user.id
    render json: @user.id
  end

  def destroy
    logout
    redirect_to root_path, flash: { notice: bye_message }
  end

  private

    def user_params
      {
        name: params[:name],
        email: "#{params[:name].gsub(/\s/, '')}#{SecureRandom.hex(9)}@shred.net",
        username: "#{SecureRandom.hex(9)}#{params[:name].gsub(/\s/, '')}",
        uid: params[:id],
        password: SecureRandom.hex(20)
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
      ['Shred on brashiki', 'LAYYYYTTTERRRRRR'].sample
    end
end
