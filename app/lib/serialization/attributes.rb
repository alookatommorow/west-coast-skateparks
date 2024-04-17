module Serialization
  module Attributes
    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods
      def attributes(*attrs)
        define_method(:attributes) { attrs }
      end
    end

    private

    def attributes_hash(record)
      attributes.each_with_object({}) do |attr, obj|
        val = attribute_value(attr, record)
        obj[attr] = val if val.present?
      end
    end

    def attribute_value(attr, record)
      return public_send(attr, record) if respond_to?(attr)

      record.public_send(attr)
    end
  end
end
