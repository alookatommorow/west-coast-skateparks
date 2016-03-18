module Users
  class MapsController < ApplicationController
    def show
      render json: User.find(params[:user_id]).map_data
    end
  end
end