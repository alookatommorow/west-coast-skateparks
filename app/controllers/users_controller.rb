class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:id] = @user.id
      redirect_to @user
    else
      redirect_to new_user_path, flash: { error: @user.errors.full_messages.first }
    end
  end

  def show
    @user = User.includes(
      favorite_parks: :location,
      visited_parks: :location,
    ).find(params[:id])
    flash.now[:notice] = "Welcome, #{@user.display_name}" if params[:from_auth]
  end

  private

    def user_params
      { username: params[:username],
        email: params[:email],
        password: params[:password] }
    end
end
