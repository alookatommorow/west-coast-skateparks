class Association
  def self.create(class_name, params)
    initialize(class_name, params)
    if association
      association.update(type => @params[type])
    else
      @class_name.create(params_for_type)
    end
  end

  class << self
    private

      def initialize(class_name, params)
        @params = params
        @class_name = class_name
      end

      def type
        @class_name.name.underscore.to_sym
      end

      def association
        @class_name.find_by(id_params)
      end

      def params_for_type
        id_params.tap do |this|
          this.merge(type => @params[type]) if type
        end
      end

      def id_params
        @params.select { |k, _v| k.to_s.match(/_id\Z/) }.
          inject({}) { |h, (k, v)| h[k] = v.to_i; h }
      end
  end
end
