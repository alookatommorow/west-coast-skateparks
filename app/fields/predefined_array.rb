require "administrate/field/base"

class PredefinedArray < Administrate::Field::Base
  def to_s
    return unless data

    data.join(', ')
  end
end
