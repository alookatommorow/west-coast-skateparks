module Skateparks
  class WeatherController < ApplicationController
    def show
      render partial: 'ajax-partials/weather', locals: { weather: get_weather }
    end

    private

      def get_weather
        if params[:latitude]
          @weather = Weather::Client.new(params[:latitude], params[:longitude]).weather
        end
      end
  end
end