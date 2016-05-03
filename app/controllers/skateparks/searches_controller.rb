module Skateparks
  class SearchesController < ApplicationController
    def show
      render partial: 'search_results', locals: {
        skateparks: Skatepark.
          includes(:location).
          search(params[:search].downcase)
      }
    end
  end
end
