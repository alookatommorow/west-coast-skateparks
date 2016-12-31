class Location < ActiveRecord::Base
  belongs_to :skatepark

  validates :city, :state, presence: true

  def has_coordinates?
    [latitude, longitude].all?(&:present?)
  end

  def new_coordinates?
    self.has_coordinates? && self.latitude_changed? && self.longitude_changed?
  end
end
