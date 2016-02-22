class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:id] = @user.id
      redirect_to @user
    else
      redirect_to root_path, notice: @user.errors.full_messages.first
    end
  end

  def show
    @user = User.find(params[:id])
    flash.now[:notice] = "Welcome #{@user.display_name}" if params[:from_auth]
  end

  def map_data
    user = User.find(params[:id])
    render json: user.map_data
  end

  private

    def user_params
      { username: params[:username],
        email: params[:email],
        password: params[:password] }
    end
end
