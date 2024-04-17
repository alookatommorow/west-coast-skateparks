module Serialization
  class BaseSerializer
    class UndefinedAttributesError < StandardError; end

    include Attributes
    include HasMany

    attr_accessor :serializeable

    def initialize(serializeable, options = {})
      @serializeable = serializeable
      @options = options
    end

    def serialize
      return serialize_collection if collection?

      json
    end

    private

    attr_reader :options

    def json(record = serializeable)
      attributes_hash(record).tap do |result|
        result.merge!(options[:additional_attributes]) if options[:additional_attributes].present?
        result.merge!(has_many_hash(record))
      end.as_json
    end

    def collection?
      serializeable.is_a?(Array) || serializeable.is_a?(ActiveRecord::Relation)
    end

    def serialize_collection
      serializeable.map { |record| json(record) }
    end

    def attributes
      raise UndefinedAttributesError, 'Serializer must define attributes'
    end
  end
end
