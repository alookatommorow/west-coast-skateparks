module Skateparks
  class StatesController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark.
          includes(:location).
          in_state(params[:state]).
          order("locations.city", :name).
          page(params[:page]),
        state: params[:state],
      }
    end
  end
end
