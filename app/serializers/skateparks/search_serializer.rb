module Skateparks
  class SearchSerializer < BaseSerializer
    attributes :slug, :name, :city, :state, :map_photo, :stars, :obstacles
  end
end
