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

  has_many :neighbor_parks

  def slug
    object.to_param
  end

  def map_photo
    object.map_photo(:thumb)
  end
end
