module Skateparks
  class MapsController < ApplicationController
    def show
      render json: {
        skatepark: skatepark_to_map_format,
        zoom: 9,
      }
    end

    private

      def skatepark_to_map_format
        skatepark = Skatepark.find(params[:skatepark_id])
        SkateparkSerializer.new(skatepark)
      end
  end
end
