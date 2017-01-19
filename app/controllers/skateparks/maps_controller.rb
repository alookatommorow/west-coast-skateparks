module Skateparks
  class MapsController < ApplicationController
    def show
      render json: skatepark_map_data
    end

    private

      def skatepark_map_data
        skatepark = Skatepark.find(params[:skatepark_id])
        SkateparkSerializer.new(skatepark).to_json
      end
  end
end
