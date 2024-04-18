class SkateparksController < ApplicationController
  before_action :find_skatepark, only: :show

  def show
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

  private

  def find_skatepark
    @skatepark = Skatepark.includes(ratings: :user).find(params[:slug])

    # If an old id or a numeric id was used to find the record, then
    # the request path will not match the skatepark_path, and we should do
    # a 301 redirect that uses the current friendly id.
    return unless request.path != skatepark_path(@skatepark)

    redirect_to @skatepark, status: :moved_permanently
  end
end
