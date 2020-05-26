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
    :slug
  )

  has_many :neighbor_parks

  def map_photo
    object.map_photo(:thumb)
  end
end
