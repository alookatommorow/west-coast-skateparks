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
    @myvisited = []
    UserSkatepark.where(user_id: params[:id]).where(visited: true).each do |item|
      @myvisited << Skatepark.find(item.skatepark_id)
    end
  end

  private

    def user_params
      {username: params[:username], email: params[:email], password: params[:password] }
    end
end
