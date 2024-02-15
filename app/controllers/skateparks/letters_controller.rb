module Skateparks
  class LettersController < ApplicationController
    def show
      render partial: 'skateparks/state', locals: {
        skateparks: Skatepark
          .in_state(params[:state_id])
          .where('lower(city) LIKE ?', "#{params[:letter].downcase}%")
          .order(:city, :name)
          .page(params[:page]),
        state: params[:state_id]
      }
    end
  end
end
