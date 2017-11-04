class SkateparkPresenter < SimpleDelegator
  def attributes
    present_attributes.slice('info', 'hours')
    .merge(titleized_attributes)
  end

  def model
    __getobj__
  end

  private

    def present_attributes
      model.attributes.select { |_k, v| v.present? }
    end

    def titleized_attributes
      to_titleize.tap { |attrs| attrs.each { |k, v|
          if k == 'size'
            v << ' sq ft'
          elsif v
            attrs[k] = v.titleize
          end
      } }
    end

    def to_titleize
      present_attributes.slice('material', 'designer', 'builder', 'opened', 'size', 'lights', 'obstacles')
    end
end
