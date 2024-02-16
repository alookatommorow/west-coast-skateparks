module Api
  module Maps
    class BaseSerializer
      def self.json(skatepark)
        skatepark.as_json(only: %i[slug name city state latitude longitude rating])
                 .merge(map_photo: skatepark.map_photo(:thumb))
      end
    end
  end
end
