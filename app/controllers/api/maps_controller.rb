module Api
  class MapsController < BaseController
    RESOURCES = {
      'skatepark' => Skatepark,
      'user' => User
    }.freeze

    def show
      resource = resource_class.find(params[:id])
      render json: Skateparks::MapSerializer.new(resource).serialize
    end

    private

    def resource_class
      RESOURCES[params[:resource_name]] || raise(InvalidRequest)
    end
  end
end
