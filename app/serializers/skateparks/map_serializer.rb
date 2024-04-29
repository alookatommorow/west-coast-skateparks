module Skateparks
  class MapSerializer < BaseSerializer
    attributes :slug, :name, :city, :state, :latitude, :longitude, :stars, :map_photo
  end
end
