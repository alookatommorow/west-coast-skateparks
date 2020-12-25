require "administrate/field/base"

class PredefinedArray < Administrate::Field::Base
  def to_s
    data&.join(', ')
  end
end
