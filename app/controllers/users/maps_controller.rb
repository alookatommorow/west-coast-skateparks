module Users
  class MapsController < ApplicationController
    def show
      render json: user_map_data
    end

    private

      def user_map_data
        user = User.find(params[:user_id])
        UserSerializer.new(user).to_json
      end
  end
end
