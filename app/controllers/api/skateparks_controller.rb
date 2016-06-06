module Api
  class SkateparksController < ApplicationController
    def index
      render json: Skatepark.includes(:location).all.to_json(include: :location)
    end
  end
end