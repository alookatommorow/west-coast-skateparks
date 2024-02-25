module Api
  class MapsController < BaseController
    RESOURCES = {
      'skatepark' => Skatepark,
      'user' => User
    }.freeze

    def show
      render json: map_data
    end

    private

    def map_data
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
