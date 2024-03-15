class UsersController < ApplicationController
  before_action :verify_user, except: %i[new create]

  def new
    @user = User.new
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      redirect_to @user, notice: 'Righteous.'
    else
      flash.now[:error] = @user.errors.full_messages.join(', ')
      render :edit
    end
  end

  def edit
    @user = User.find(params[:id])
  end

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
    # @favorites = Skateparks::SearchSerializer.new(current_user.favorites).serialize
    # @visits = Skateparks::SearchSerializer.new(current_user.visits).serialize
    @skateparks = Skateparks::MapSerializer.new(current_user).serialize
    @num_ratings = current_user.ratings.count

    flash.now[:notice] = "Welcome, #{@user}" if params[:from_vendor]
  rescue StandardError => e
    binding.pry
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
