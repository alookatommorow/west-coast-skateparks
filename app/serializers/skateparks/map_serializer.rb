module Skateparks
  class MapSerializer < BaseSerializer
    attributes :slug, :name, :city, :state, :latitude, :longitude, :stars, :map_photo

    def serialize
      return for_user if serializeable.is_a? User

      for_skatepark if serializeable.is_a? Skatepark
    end

    def json(record)
      return record.map { |r| super(r) } if collection?(record)

      super(record)
    end

    private

    def for_user
      both = serializeable.favorites & serializeable.visits

      {
        collections: [
          {
            type: 'favorite',
            items: json(serializeable.favorites - both)
          },
          {
            type: 'visited',
            items: json(serializeable.visits - both)
          },
          {
            type: 'both',
            items: json(both)
          }
        ]
      }
    end

    def for_skatepark
      {
        main: json(serializeable),
        collections: [
          {
            type: 'nearby',
            items: json(serializeable.neighbor_parks)
          }
        ]
      }
    end
  end
end
