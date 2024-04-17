class UsersController < ApplicationController
  before_action :verify_user, except: %i[new create]

  def new
    @user = User.new
  end

  def update
    if current_user.update(user_params)
      redirect_to current_user, notice: 'Righteous.'
    else
      flash.now[:error] = current_user.errors.full_messages.join(', ')
      render :edit
    end
  end

  def edit; end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:signed_up] = true
      session[:id] = @user.id
      redirect_to @user, notice: "Welcome, #{@user.username}"
    else
      redirect_to new_user_path, flash: { error: @user.errors.full_messages.first }
    end
  end

  def show
    @user = UserSerializer.new(current_user).serialize
    @skateparks = Skateparks::MapData.for(current_user)
    @num_ratings = current_user.ratings.count

    flash.now[:notice] = "Welcome, #{current_user}" if params[:from_vendor]
  end

  private

  def verify_user
    if !logged_in?
      redirect_to new_session_path, flash: { error: 'Sign in to see your profile' }
    elsif logged_in? && params[:id].to_i != current_user.id
      redirect_to root_path, flash: { error: "That's not your profile" }
    end
  end

  def user_params
    params.require(:user).permit(:username, :password, :name, :email, :avatar)
  end
end
