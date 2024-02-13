class SkateparksController < ApplicationController
  def show
    @skatepark = Skatepark.includes(:skatepark_images).find(params[:slug])
    @ratings = ActiveModelSerializers::SerializableResource.new(
      @skatepark.ratings.includes(:user).order(created_at: :desc),
      adapter: :attributes,
      each_serializer: RatingSerializer
    ).as_json

    if current_user
      @has_favorited = current_user.has_favorited?(@skatepark.id)
      @has_visited = current_user.has_visited?(@skatepark.id)
    end
  end

  def index; end

  def search
    @ca_parks = skateparks_json(Skatepark.in_state('california').order(:city))
    @or_parks = skateparks_json(Skatepark.in_state('oregon').order(:city))
    @wa_parks = skateparks_json(Skatepark.in_state('washington').order(:city))
    @query = params[:query]
  end

  private

  def skateparks_json(skateparks)
    ActiveModelSerializers::SerializableResource.new(
      skateparks,
      each_serializer: Search::SkateparkSerializer
    ).as_json
  end
end
