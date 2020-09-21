module Api
  class SkateparksController < ApplicationController
    def index
      render json: skateparks_json
    end

    private

    def skateparks_json
      if params[:for_map].present?
        ActiveModelSerializers::SerializableResource.new(
          Skatepark.all,
          each_serializer: ::Search::SkateparkSerializer
        ).as_json
      else
        Skatepark.all.as_json(only: [:slug, :name, :city, :state])
      end
    end
  end
end
