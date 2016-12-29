class SkateparkSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :slug,
    :name,
    :city,
    :state,
    :latitude,
    :longitude,
    :map_photo,
    :rating,
  )

  has_many :nearby_parks

  def nearby_parks
    object.nearby_parks.includes(:location)
  end

  def slug
    object.to_param
  end

  def map_photo
    object.map_photo(:thumb)
  end
end
