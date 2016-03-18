module Skateparks
  class MapsController < ApplicationController
    def show
      render json: Skatepark.find(params[:skatepark_id]).map_data
    end
  end
end