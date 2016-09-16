class SkateparkPresenter < SimpleDelegator

  def attributes
    present_attributes.slice('info', 'hours')
    .merge(titleized_attributes)
  end

  def average_rating
    if model.ratings.any?
      raw_avg = model.ratings.average(:rating)
      (raw_avg * 2).ceil.to_f / 2
    end
  end

  def model
    __getobj__
  end

  def formatted_address
    if zip_code
      address + ", " + city.titleize + ", " + states["#{state}"] + " " + zip_code
    else
      address
    end
  end

  private

    def add_sq_ft

    end

    def states
      {
        'california' => 'CA',
        'oregon' => 'OR',
        'washington' => 'WA',
      }
    end

    def present_attributes
      model.attributes.select { |_k, v| v.present? }
    end

    def titleized_attributes
      to_titleize.tap { |attrs| attrs.each do |k, v|
          if k == 'size'
            v << ' sq ft'
          elsif v
            attrs[k] = v.titleize
          end
        end
      }
    end

    def to_titleize
      present_attributes.slice('material', 'designer', 'builder', 'opened', 'size', 'lights', 'obstacles')
    end
end
