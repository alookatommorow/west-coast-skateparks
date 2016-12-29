module Users
  class MapsController < ApplicationController
    def show
      render json: {
        user: user_to_map_format,
        zoom: 6,
      }
    end

    private

      def user_to_map_format
        user = User.find(params[:user_id])
        UserSerializer.new(user)
      end
  end
end
