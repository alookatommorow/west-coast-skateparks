class SkateparksController < ApplicationController
  def show
    @skatepark = Skatepark.includes(:skatepark_images).find(params[:slug])
    @ratings = ActiveModelSerializers::SerializableResource.new(
      @skatepark.ratings.includes(:user).order(created_at: :desc),
      adapter: :attributes,
      each_serializer: RatingSerializer
    ).as_json

    @has_favorited = !!current_user&.favorited?(@skatepark.id)
    @has_visited = !!current_user&.visited?(@skatepark.id)
  end

  def index; end

  def search
    @ca_parks = skateparks_json(Skatepark.in_state('california').order(:city))
    @or_parks = skateparks_json(Skatepark.in_state('oregon').order(:city))
    @wa_parks = skateparks_json(Skatepark.in_state('washington').order(:city))
    @query = params[:query]
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

  def skateparks_json(skateparks)
    ActiveModelSerializers::SerializableResource.new(
      skateparks,
      each_serializer: Search::SkateparkSerializer
    ).as_json
  end
end
