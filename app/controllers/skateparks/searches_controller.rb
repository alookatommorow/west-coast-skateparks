module Skateparks
  class SearchesController < ApplicationController
    def create
      render partial: 'search_results', locals: {
        skateparks: Skatepark.search(params[:search].downcase) }
    end
  end
end
