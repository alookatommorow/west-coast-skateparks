class BaseSerializer
  class UndefinedAttributesError < StandardError; end

  class << self
    extend ::Attributes

    def json(resource, options = {})
      if resource.is_a?(Array) || resource.is_a?(ActiveRecord::Relation)
        return resource.map { |resource| resource_json(resource, options) }
      end

      resource_json(resource, options)
    end

    private

    def resource_json(resource, options)
      raw, dynamic = parse_attributes(resource, options)

      resource.as_json(only: raw)
              .merge(dynamic)
              .compact
    end

    def parse_attributes(resource, options)
      attributes.each_with_object([[], {}]) do |attr, obj|
        raw = obj[0]
        dynamic = obj[1]

        if singleton_methods.include? attr
          dynamic[attr] = send(attr, resource)
        elsif resource.attribute_names.include? attr.to_s
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
end
