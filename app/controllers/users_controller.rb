class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:id] = @user.id
      redirect_to @user
    else
      render 'new'
    end
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def map_data
    user = User.find(params[:id])
    render json: user.map_data
  end

  private

    def user_params
      {username: params[:username], email: params[:email], password: params[:password] }
    end
end
