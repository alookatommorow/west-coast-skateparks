class SkateparksController < ApplicationController
  before_action :set_skatepark, only: %i(favorite unfavorite visit unvisit)

  def show
    @skatepark = Skatepark.includes({reviews: :user }, :ratings).find(params[:id])
    @next_park, @previous_park = [@skatepark.next_park, @skatepark.previous_park]
  end

  def index
    @skateparks = Skatepark.includes(:location).all
  end

  def favorite
    @skatepark.favoriters << current_user
    render_favorite_button
  end

  def unfavorite
    @skatepark.favoriters.destroy(current_user)
    render_favorite_button
  end

  def visit
    @skatepark.visitors << current_user
    render_visit_button
  end

  def unvisit
    @skatepark.visitors.destroy(current_user)
    render_visit_button
  end

  private

    def render_favorite_button
      render partial: "favorites/button", locals: {
        user: current_user,
        skatepark: @skatepark,
      }
    end

    def render_visit_button
      render partial: "visits/button", locals: {
        user: current_user,
        skatepark: @skatepark,
      }
    end

    def set_skatepark
      @skatepark = Skatepark.find(params[:id])
    end
end
