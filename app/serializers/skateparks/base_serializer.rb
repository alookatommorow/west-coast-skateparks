module Skateparks
  class BaseSerializer < ::BaseSerializer
    def map_photo(skatepark = serializeable)
      skatepark.map_photo(:thumb)
    end

    def obstacles(skatepark = serializeable)
      skatepark.obstacles&.join(', ')
    end

    def address(skatepark = serializeable)
      "#{skatepark.address}, #{skatepark.city.titleize}, #{Skatepark::STATE_ABBREVS[skatepark.state]} #{skatepark.zip_code || ''}"
        .strip
    end

    def size(skatepark = serializeable)
      return if skatepark.size.blank?

      "#{skatepark.size} sq ft"
    end
  end
end
