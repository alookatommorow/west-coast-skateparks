class ManyToMany
  def self.create(class_name, params)
    initialize(class_name, params)
    if association
      association.update(type => @params[type])
    else
      @class_name.create(params_for_type)
    end
  end

  def self.destroy(class_name, params)
    initialize(class_name, params)
    association.destroy if association
  end

  class << self
    private

      attr_reader :params, :class_name

      def initialize(class_name, params)
        @params = params
        @class_name = class_name
      end

      def type
        class_name.name.underscore.to_sym
      end

      def association
        class_name.find_by(foreign_keys)
      end

      def params_for_type
        foreign_keys.tap do |this|
          this.merge(type => params[type]) if type
        end
      end

      def foreign_keys
        params.select { |k, _v| k.to_s.match(/_id\Z/) }.
          inject({}) { |h, (k, v)| h[k] = v.to_i; h }
      end
  end
end
