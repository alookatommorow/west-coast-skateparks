class SkateparksController < ApplicationController
  def show
    @skatepark = Skatepark.includes(:skatepark_images).find(params[:slug])
    @has_favorited = !!current_user&.favorited?(@skatepark.id)
    @has_visited = !!current_user&.visited?(@skatepark.id)
    @ratings = RatingSerializer.new(
      @skatepark.ratings.includes(:user).order(created_at: :desc)
    ).serialize
  end

  def index; end

  def search
    @skateparks = Skateparks::SearchSerializer.new(
      Skatepark.all.order(:state, :city, :name)
    ).serialize
  end

  # DEPRECATED: to be removed in favor of /api/skateparks routes when user page converts to react
  def favorite
    skatepark.favoriters << current_user
    head :ok
  end

  def unfavorite
    skatepark.favoriters.destroy(current_user)
    head :ok
  end

  def visit
    skatepark.visitors << current_user
    head :ok
  end

  def unvisit
    skatepark.visitors.destroy(current_user)
    head :ok
  end

  private

  def skatepark
    @skatepark ||= Skatepark.find(params[:slug])
  end
end
