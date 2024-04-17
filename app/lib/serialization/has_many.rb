module Serialization
  module HasMany
    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods
      def has_many_associations # rubocop:disable Naming/PredicateName
        @has_many_associations ||= {}
      end

      def has_many(attr, options = {}) # rubocop:disable Naming/PredicateName
        has_many_associations[attr] = default_options(attr, options)
      end

      private

      def default_options(attr, options)
        options.tap do |obj|
          obj[:key] = attr if options[:key].blank?
          obj[:serializer] = serializer(attr, options)
        end
      end

      def serializer(association, options)
        serializer_class = options[:serializer] || "#{association.to_s.singularize.camelize}Serializer".constantize
        serializer_class.new(nil)
      end
    end

    private

    def has_many_hash(record) # rubocop:disable Naming/PredicateName
      {}.tap do |obj|
        self.class.has_many_associations.each_pair do |association, options|
          serializer = options[:serializer]
          serializer.serializeable = record.public_send(association)

          obj[options[:key]] = serializer.serialize
        end
      end
    end
  end
end
