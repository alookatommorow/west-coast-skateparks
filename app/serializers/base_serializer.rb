class BaseSerializer
  class UndefinedAttributesError < StandardError; end

  extend ::Attributes

  attr_reader :serializeable, :options

  def initialize(serializeable, options = {})
    @serializeable = serializeable
    @options = options
  end

  def serialize
    return serializeable.map { |record| json(record) } if collection?

    json
  end

  def json(record = serializeable)
    result = {}

    attributes.each do |attr|
      val = if respond_to?(attr)
              send(attr, record)
            else
              record.send(attr)
            end

      result[attr] = val if val.present?

      options[:additional_attributes]&.each do |key, value|
        result[key] = value
      end
    end

    result.as_json
  end

  private

  def collection?(record = serializeable)
    record.is_a?(Array) || record.is_a?(ActiveRecord::Relation)
  end

  def attributes
    raise UndefinedAttributesError, 'Serializer must define attributes'
  end
end
