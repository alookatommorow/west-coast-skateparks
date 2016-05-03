module Users
  class MapsController < ApplicationController
    def show
      render json: User.
        includes(
          favorite_parks: :location,
          visited_parks: :location,
        ).find(params[:user_id]).map_data
    end
  end
end
