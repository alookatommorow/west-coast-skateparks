module Api
  class SkateparksController < ApplicationController
    def index
      render json: Skatepark.all.as_json(
        only: [:slug, :name, :city, :state]
      )
    end
  end
end
