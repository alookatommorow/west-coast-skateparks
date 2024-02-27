module Skateparks
  class BaseSerializer < ::BaseSerializer
    class << self
      def map_photo(skatepark)
        skatepark.map_photo(:thumb)
      end

      def obstacles(skatepark)
        skatepark.obstacles&.join(', ')
      end
    end
  end
end
