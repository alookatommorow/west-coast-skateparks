class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to @user, notice: "Righteous."
    else
      flash.now[:error] = @user.errors.full_messages.join(", ")
      render :edit
    end
  end

  def edit
    @user = User.includes(
      favorite_parks: :location,
      visited_parks: :location,
    ).find(params[:id])
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
      params.require(:user).permit(:username, :password, :name, :email, :avatar)
    end
end
