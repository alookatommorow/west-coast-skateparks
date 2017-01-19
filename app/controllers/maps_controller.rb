class MapsController < ApplicationController
  WHITELISTED_CLASSNAMES = {
    "skateparks" => Skatepark,
    "users" => User,
  }.freeze

  def show
    render json: map_data_for_resource
  end

  private

    def map_data_for_resource
      unless resource_class.nil?
        resource = resource_class.find(params[:id])
        resource_serializer.new(resource).to_json
      end
    end

    def resource_class
      WHITELISTED_CLASSNAMES[params[:resource_name]]
    end

    def resource_serializer
      "#{resource_class}Serializer".constantize
    end
end
