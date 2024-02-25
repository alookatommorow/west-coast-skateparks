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
      resource = resource_class.find(params[:id])
      Skateparks::MapSerializer.send("for_#{params[:resource_name]}", resource)
    end

    def resource_class
      RESOURCES[params[:resource_name]] || raise(InvalidRequest)
    end
  end
end
