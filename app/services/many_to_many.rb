class ManyToMany
  def self.create(klass, params)
    initialize(klass, params)
    if association
      association.update(type => params[type])
    else
      klass.create(params_for_type)
    end
  end

  def self.destroy(klass, params)
    initialize(klass, params)
    association.destroy if association
  end

  class << self
    private

      attr_reader :klass, :params

      def initialize(klass, params)
        @klass = klass
        @params = params
      end

      def type
        klass.name.underscore
      end

      def association
        klass.find_by(foreign_keys)
      end

      def params_for_type
        if params[type]
          foreign_keys.merge(type => params[type])
        else
          foreign_keys
        end
      end

      def foreign_keys
        params.select { |k, _v| k.to_s.match(/_id\Z/) }.
          inject({}) { |h, (k, v)| h[k] = v.to_i; h }
      end
  end
end
