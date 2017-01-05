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

  def favorite
    @skatepark = Skatepark.find(params[:id])
    @skatepark.favoriters << current_user
    render_favorite_button
  end

  def unfavorite
    @skatepark = Skatepark.find(params[:id])
    @skatepark.favoriters.destroy(current_user)
    render_favorite_button
  end

  private

    def render_favorite_button
      render partial: "favorites/button", locals: {
        user: current_user,
        skatepark: @skatepark,
      }
    end

    def assign_associations
      if logged_in?
        @visit = current_user.visits.where(skatepark_id: @skatepark.id).take
      end
    end
end
