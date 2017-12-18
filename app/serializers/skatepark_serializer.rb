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
    :is_skatepark?,
  )

  has_many :neighbor_parks

  def slug
    object.to_param
  end

  def map_photo
    object.map_photo(:thumb)
  end

  def is_skatepark?
    true
  end
end
