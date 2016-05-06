module Skateparks
  class LettersController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark.
          includes(:location).
          in_state(params[:state_id]).
          where("lower(locations.city) LIKE ?", "#{params[:letter].downcase}%").
          order("locations.city", :name).
          page(params[:page]),
        state: params[:state_id],
      }
    end
  end
end
