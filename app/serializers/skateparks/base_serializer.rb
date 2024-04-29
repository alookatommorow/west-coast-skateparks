module Skateparks
  class BaseSerializer < ::Serialization::BaseSerializer
    def map_photo
      record.map_photo(:thumb)
    end

    def obstacles
      record.obstacles&.join(', ')
    end

    def address
      "#{record.address}, #{record.city.titleize}, #{Skatepark::STATE_ABBREVS[record.state]} #{record.zip_code || ''}"
        .strip
    end

    def size
      return if record.size.blank?

      "#{record.size} sq ft"
    end
  end
end
