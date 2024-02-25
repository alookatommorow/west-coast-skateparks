module Skateparks
  class BaseSerializer
    RAW_ATTRIBUTES = %i[slug name city state latitude longitude stars].freeze
    METHOD_ATTRIBUTES = %i[map_photo obstacles].freeze

    class << self
      def json(skatepark)
        raw_attributes, method_attributes = parse_attributes(skatepark)

        skatepark.as_json(only: raw_attributes)
                 .merge(method_attributes)
                 .compact
      end

      private

      def parse_attributes(skatepark)
        raw_attributes = []
        method_attributes = {}

        attributes.each do |attr|
          if RAW_ATTRIBUTES.include?(attr)
            raw_attributes.push(attr)
          elsif METHOD_ATTRIBUTES.include?(attr)
            method_attributes[attr] = send(attr, skatepark)
          end
        end

        [raw_attributes, method_attributes]
      end

      def attributes
        return self::ATTRIBUTES if const_defined? :ATTRIBUTES

        RAW_ATTRIBUTES
      end

      def map_photo(skatepark)
        skatepark.map_photo(:thumb)
      end

      def obstacles(skatepark)
        skatepark.obstacles&.join(', ')
      end
    end
  end
end
