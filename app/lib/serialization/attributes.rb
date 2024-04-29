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

    def attributes_hash
      attributes.each_with_object({}) do |attr, obj|
        val = attribute_value(attr)
        obj[attr] = val if val.present?
      end
    end

    def attribute_value(attr)
      return public_send(attr) if respond_to?(attr)

      record.public_send(attr)
    end
  end
end
