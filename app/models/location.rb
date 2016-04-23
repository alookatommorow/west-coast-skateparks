class Location < ActiveRecord::Base
  belongs_to :skatepark

  validates :city, :state, presence: true

  def has_coordinates?
    [latitude, longitude].all?(&:present?)
  end
end