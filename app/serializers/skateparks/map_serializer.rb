module Skateparks
  class MapSerializer < BaseSerializer
    ATTRIBUTES = %i[slug name city state latitude longitude stars map_photo].freeze

    def self.for_user(user)
      both = user.favorites & user.visits
      visits = (user.visits - both).map { |park| json(park) }
      favorites = (user.favorites - both).map { |park| json(park) }

      {
        collections: [
          {
            type: 'favorite',
            items: favorites
          },
          {
            type: 'visited',
            items: visits
          },
          {
            type: 'both',
            items: both.map { |park| json(park) }
          }
        ]
      }
    end

    def self.for_skatepark(skatepark)
      items = skatepark.neighbor_parks.map { |park| json(park) }
      {
        main: json(skatepark),
        collections: [
          {
            type: 'nearby',
            items:
          }
        ]
      }
    end
  end
end
