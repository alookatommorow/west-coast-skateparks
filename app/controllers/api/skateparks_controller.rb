module Api
  class SkateparksController < ApplicationController
    def index
      render json: Skatepark.includes(:location).all.as_json(
        only: [:id, :name],
        include: { location:
          { only: [:city, :state] }
        })
    end
  end
end