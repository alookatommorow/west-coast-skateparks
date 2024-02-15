module Skateparks
  class WeatherController < ApplicationController
    def show
      render partial: 'ajax-partials/weather',
             locals: { weather: Weather::Client.new(params[:latitude], params[:longitude]).weather }
    end
  end
end
