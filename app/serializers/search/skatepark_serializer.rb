module Search
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

    def map_photo
      object.map_photo(:thumb)
    end
  end
end
