module Api
  class SkateparksController < ApplicationController
    def index
      render json: Skatepark.all
    end
  end
end