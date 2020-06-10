module Skateparks
  class StatesController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark.
          in_state(params[:state]).
          order(:city, :name).
          page(params[:page]),
        state: params[:state],
      }
    end
  end
end
