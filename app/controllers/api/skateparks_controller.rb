module Api
  class SkateparksController < ApplicationController
    def index
      render json: Skatepark.all.as_json(only: attrs)
    end

    private

    def attrs
      base_attrs = [:slug, :name, :city, :state]
      return base_attrs if params[:for_map].blank?

      base_attrs.concat([:latitude, :longitude])
    end
  end
end
