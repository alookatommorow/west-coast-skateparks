module Skateparks
  class MapData
    class << self
      def for(resource)
        return for_user(resource) if resource.is_a? User

        for_skatepark(resource) if resource.is_a? Skatepark
      end

      private

      def serializer
        @serializer ||= Skateparks::MapSerializer.new(nil)
      end

      def json(resource)
        serializer.serializeable = resource
        serializer.serialize
      end

      def for_user(resource)
        favorite = resource.favorites
        visited = resource.visits

        {
          favorite: json(favorite),
          visited: json(visited),
          both: both_json(visited & favorite)
        }
      end

      def for_skatepark(resource)
        {
          main: [json(resource)],
          nearby: json(resource.neighbor_parks)
        }
      end

      def both_json(items)
        items.each_with_object({}) do |item, obj|
          obj[item.slug] = json(item)
        end
      end
    end
  end
end
