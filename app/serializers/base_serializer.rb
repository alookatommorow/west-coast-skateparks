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
    raw, dynamic = parse_attributes(record)

    record.as_json(only: raw).merge(dynamic)
  end

  private

  def collection?(record = serializeable)
    record.is_a?(Array) || record.is_a?(ActiveRecord::Relation)
  end

  def parse_attributes(record)
    attributes.each_with_object([[], {}]) do |attr, obj|
      raw = obj[0]
      dynamic = obj[1]

      if respond_to? attr
        dynamic_value = send(attr, record)
        dynamic[attr] = dynamic_value if dynamic_value.present?
      elsif record.send(attr).present?
        raw.push attr
      end

      next if options[:additional_attributes].blank?

      options[:additional_attributes].each do |key, value|
        dynamic[key] = value
      end
    end
  end

  def attributes
    raise UndefinedAttributesError, 'Serializer must define attributes'
  end
end
