module Skateparks
  class StatesController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark.joins(:location).where("locations.state = ?", params[:state])
      }
    end
  end
end