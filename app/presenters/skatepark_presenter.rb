class SkateparkPresenter < SimpleDelegator
  def attributes
    present_attributes.slice('address', 'info', 'hours').merge(titleized_attributes)
  end

  def average_rating
    if model.ratings.any?
      model.ratings.map(&:rating).reduce(:+) / model.ratings.length
    else
      'Be the first to rate!'
    end
  end

  def model
    __getobj__
  end

  private

    def present_attributes
      model.attributes.select { |_k, v| v.present? }
    end

    def titleized_attributes
      to_titleize.tap { |attrs| attrs.each { |k, v| attrs[k] = v.titleize if v } }
    end

    def to_titleize
      present_attributes.slice('material', 'designer', 'builder', 'opened', 'size', 'lights', 'obstacles')
    end
end