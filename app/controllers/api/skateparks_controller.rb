module Api
  class SkateparksController < BaseController
    def index
      render json: Skatepark.all.as_json(
        only: %i[slug name city state]
      )
    end

    def favorite
      skatepark.favoriters << User.find(params[:user_id])
      head :ok
    end

    def unfavorite
      skatepark.favoriters.destroy(params[:user_id])
      head :ok
    end

    def visit
      skatepark.visitors << User.find(params[:user_id])
      head :ok
    end

    def unvisit
      skatepark.visitors.destroy(params[:user_id])
      head :ok
    end

    private

    def skatepark
      @skatepark ||= Skatepark.find(params[:slug])
    end
  end
end
