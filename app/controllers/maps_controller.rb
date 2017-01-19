class MapsController < ApplicationController
  def show
    render json: map_data_for_resource
  end

  private

    def map_data_for_resource
      resource = resource_class.find(params[:id])
      resource_serializer.new(resource).to_json
    end

    def resource_class
      params[:type].singularize.classify.constantize
    end

    def resource_serializer
      "#{resource_class}Serializer".constantize
    end
end
