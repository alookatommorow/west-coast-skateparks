class SkateparksController < ApplicationController
  def show
    @skatepark = SkateparkPresenter.new(
      Skatepark.includes({ reviews: :user }, :ratings).find(params[:id])
    )
    assign_associations
  end

  def index
    @skateparks = Skatepark.includes(:location).all
  end

  private

    def assign_associations
      if logged_in?
        @favorite = current_user.favorites.where(skatepark_id: @skatepark.id).take
        @visit = current_user.visits.where(skatepark_id: @skatepark.id).take
      end
    end
end
