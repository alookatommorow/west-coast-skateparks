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
    @myfavorites = []
    @myvisited = []
    UserSkatepark.where(user_id: params[:id]).where(favorite: true).each do |item|
      @myfavorites << Skatepark.find(item.skatepark_id)
    end
    UserSkatepark.where(user_id: params[:id]).where(visited: true).each do |item|
      @myvisited << Skatepark.find(item.skatepark_id)
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end
