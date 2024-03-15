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
      favorite = serializeable.favorites
      visited = serializeable.visits

      {
        favorite: json(favorite),
        visited: json(visited),
        both: both_json(visited & favorite)
      }
    end

    def for_skatepark
      {
        main: [json(serializeable)],
        nearby: json(serializeable.neighbor_parks)
      }
    end

    def both_json(items)
      items.each_with_object({}) do |item, obj|
        obj[item.slug] = json(item)
      end
    end
  end
end
