module Skateparks
  class SearchesController < ApplicationController
    def new
    end

    def show
      render partial: 'search_results', locals: {
        skateparks: Skatepark.
          includes(:location).
          search(params[:search].downcase)
      }
    end
  end
end
