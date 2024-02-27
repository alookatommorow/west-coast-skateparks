module Skateparks
  class SearchSerializer < Skateparks::BaseSerializer
    class << self
      attributes :slug, :name, :city, :state, :map_photo, :stars, :obstacles
    end
  end
end
