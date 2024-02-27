module Skateparks
  class MapSerializer < BaseSerializer
    class << self
      attributes :slug, :name, :city, :state, :latitude, :longitude, :stars, :map_photo

      def for_user(user)
        both = user.favorites & user.visits

        {
          collections: [
            {
              type: 'favorite',
              items: json(user.favorites - both)
            },
            {
              type: 'visited',
              items: json(user.visits - both)
            },
            {
              type: 'both',
              items: json(both)
            }
          ]
        }
      end

      def for_skatepark(skatepark)
        {
          main: json(skatepark),
          collections: [
            {
              type: 'nearby',
              items: json(skatepark.neighbor_parks)
            }
          ]
        }
      end
    end
  end
end
