module Api
  class MapsController < ApplicationController
    WHITELISTED_CLASSNAMES = {
      'skateparks' => Skatepark,
      'users' => User
    }.freeze

    def show
      render json: map_data_for_resource
    rescue StandardError => e
      binding.pry
    end

    private

    def map_data_for_resource
      return if resource_class.nil?

      resource = resource_class.find(params[:id])
      resource_serializer.serialize(resource)
    end

    def resource_class
      WHITELISTED_CLASSNAMES[params[:resource_name]]
    end

    def resource_serializer
      "Api::Maps::#{resource_class}Serializer".constantize
    end
  end
end
