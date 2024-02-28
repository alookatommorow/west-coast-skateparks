module Skateparks
  class SearchSerializer < Skateparks::BaseSerializer
    attributes :slug, :name, :city, :state, :map_photo, :stars, :obstacles
  end
end
