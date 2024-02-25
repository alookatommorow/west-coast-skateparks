module Skateparks
  class SearchSerializer < Skateparks::BaseSerializer
    ATTRIBUTES = %i[
      id
      slug
      name
      city
      state
      map_photo
      stars
      obstacles
    ].freeze
  end
end
