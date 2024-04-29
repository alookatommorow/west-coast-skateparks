module Serialization
  class BaseSerializer
    class UndefinedAttributesError < StandardError; end

    include Attributes
    include HasMany

    def initialize(serializeable = nil, options = {})
      @serializeable = serializeable
      @record = serializeable
      @options = options
    end

    def serialize(to_serialize = serializeable)
      return serialize_collection(to_serialize) if to_serialize.respond_to? :length

      @record = to_serialize
      json
    end

    private

    attr_reader :options, :serializeable
    attr_accessor :record

    def json
      attributes_hash.tap do |result|
        result.merge!(options[:additional_attributes]) if options[:additional_attributes].present?
        result.merge!(has_many_hash)
      end.as_json
    end

    def serialize_collection(to_serialize)
      to_serialize.map { |s| serialize(s) }
    end

    def attributes
      raise UndefinedAttributesError, 'Serializer must define attributes'
    end
  end
end
