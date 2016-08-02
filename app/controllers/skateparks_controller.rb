class SkateparksController < ApplicationController
  def show
    @skatepark = SkateparkPresenter.new(
      Skatepark.includes({ reviews: :user }, :ratings).find(params[:id])
    )
    @weather = Weather::Client.new(@skatepark.latitude, @skatepark.longitude).weather
    assign_associations
  end

  private

    def assign_associations
      if logged_in?
        @favorite = current_user.favorites.where(skatepark_id: @skatepark.id).take
        @visit = current_user.visits.where(skatepark_id: @skatepark.id).take
      end
    end
end
