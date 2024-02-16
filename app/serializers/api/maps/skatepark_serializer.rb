module Api
  module Maps
    class SkateparkSerializer < BaseSerializer
      def self.serialize(skatepark)
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
end
