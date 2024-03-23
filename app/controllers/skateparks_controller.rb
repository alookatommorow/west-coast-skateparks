class SkateparksController < ApplicationController
  def show
    @skatepark = Skatepark.find(params[:slug])
    @skatepark_json = Skateparks::ShowSerializer.new(@skatepark).serialize
    @has_favorited = !!current_user&.favorited?(@skatepark.id)
    @has_visited = !!current_user&.visited?(@skatepark.id)
    @ratings = RatingSerializer.new(
      @skatepark.ratings.includes(:user).order(created_at: :desc)
    ).serialize
    @photos = @skatepark.skatepark_images.map(&:photo)
  end

  def index; end

  def search
    @skateparks = Skateparks::SearchSerializer.new(
      Skatepark.all.order(:state, :city, :name)
    ).serialize
  end
end
