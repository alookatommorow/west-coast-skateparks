module Skateparks
  class BaseSerializer < ::BaseSerializer
    def map_photo(skatepark = serializeable)
      skatepark.map_photo(:thumb)
    end

    def obstacles(skatepark = serializeable)
      skatepark.obstacles&.join(', ')
    end
  end
end
