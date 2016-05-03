module Skateparks
  class LettersController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark.
          in_state(params[:state_id]).
          where("lower(locations.city) LIKE ?", "#{params[:letter].downcase}%"),
        state: params[:state_id],
      }
    end
  end
end
