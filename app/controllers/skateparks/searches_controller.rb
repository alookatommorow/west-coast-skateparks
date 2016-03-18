module Skateparks
  class SearchesController < ApplicationController
    def show
      render partial: 'search_results', locals: {
        skateparks: Skatepark.search(params[:search].downcase) }
    end
  end
end
