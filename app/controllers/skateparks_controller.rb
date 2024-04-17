class SkateparksController < ApplicationController
  def show
    @skatepark = Skatepark.includes(ratings: :user).find(params[:slug])
    @skatepark_json = Skateparks::ShowSerializer.new(@skatepark).serialize
    @has_favorited = !!current_user&.favorited?(@skatepark.id)
    @has_visited = !!current_user&.visited?(@skatepark.id)
    @map_data = Skateparks::MapData.for(@skatepark)
  end

  def index; end

  def search
    @skateparks = Skateparks::SearchSerializer.new(
      Skatepark.all.order(:state, :city, :name)
    ).serialize
  end
end
