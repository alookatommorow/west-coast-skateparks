class SkateparksController < ApplicationController
  before_action :redirect_if_old_url, only: :show
  before_action :set_skatepark, only: %i(favorite unfavorite visit unvisit)

  def show
    @skatepark = Skatepark.includes(
      { ratings: :user },
      :skatepark_images,
    ).find(params[:slug])

    @ratings = ActiveModelSerializers::SerializableResource.new(
      @skatepark.ratings.order(created_at: :desc),
      adapter: :attributes,
      each_serializer: RatingSerializer
    ).as_json

    if current_user
      @has_favorited = current_user.has_favorited?(@skatepark.id)
      @has_visited = current_user.has_visited?(@skatepark.id)
    end
  end

  def index
    @skateparks = Skatepark.all
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

  def search; end


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
    @skatepark = Skatepark.find(params[:slug])
  end

  def redirect_if_old_url
    skatepark = Skatepark.find_by(slug: params[:slug])

    # return unless skatepark not found (using old url)
    return if skatepark.present?

    split_param = params[:slug].split('-')

    # if first part of param is number (ie '444-tapiola-park-astoria-oregon')
    if split_param[0].to_i > 0
      split_param.shift

      redirect_to skatepark_path(split_param.join('-')), status: :moved_permanently
    end
  end
end
