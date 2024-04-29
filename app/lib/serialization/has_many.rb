module Serialization
  module HasMany
    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods
      def has_many_associations # rubocop:disable Naming/PredicateName
        @has_many_associations ||= {}
      end

      # @param [Symbol] key
      #   The name of the ActiveRecord has_many association to serialize
      #   Ex. :skatepark_images
      # @param [Hash] options
      #   Serialization options for the association
      #   @option options [Constant] :serializer
      #     The serializer to use to serialize the association
      #   @option options [Symbol] :key
      #     The key to use to serialize the collection
      #   Ex. {
      #     serializer: SpecialSerializer
      #     key: :photos
      #   }
      def has_many(key, options = {}) # rubocop:disable Naming/PredicateName
        has_many_associations[key] = default_options(key, options)
      end

      private

      def default_options(key, options)
        options.tap do |obj|
          obj[:key] = key if options[:key].blank?
          obj[:serializer] = serializer(key, options)
        end
      end

      def serializer(key, options)
        serializer_class = options[:serializer] || "#{key.to_s.singularize.camelize}Serializer".constantize
        serializer_class.new
      end
    end

    private

    def has_many_hash # rubocop:disable Naming/PredicateName
      {}.tap do |obj|
        self.class.has_many_associations.each_pair do |key, options|
          association = record.public_send(key)

          obj[options[:key]] = options[:serializer].serialize(association)
        end
      end
    end
  end
end
