module Skateparks
  module Mappable
    extend ActiveSupport::Concern

    def map_data
      raise NotImplementedError
    end

    private

    def map_serializer
      @map_serializer ||= Skateparks::MapSerializer.new
    end

    def map_json(resource)
      map_serializer.serialize(resource)
    end

    def map_json_by_slug(items)
      items.each_with_object({}) do |item, obj|
        obj[item.slug] = map_json(item)
      end
    end
  end
end
