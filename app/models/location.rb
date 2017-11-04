class Location < ActiveRecord::Base
  belongs_to :skatepark
  validates :city, :state, presence: true

  scope :in_state, -> (state) { where(state: state) }

  scope :neighbors_of, -> (location) {
    radius = 0.4
    where(
      "locations.latitude BETWEEN ? AND ?",
      location.latitude - radius,
      location.latitude + radius,
    ).where(
      "locations.longitude BETWEEN ? AND ?",
      location.longitude - radius,
      location.longitude + radius)
  }

  def has_coordinates?
    [latitude, longitude].all?(&:present?)
  end

  def new_coordinates?
    self.latitude_changed? && self.longitude_changed?
  end

  def to_s
    if zip_code
      address + ", " + city.titleize + ", " + states["#{state}"] + " " + zip_code
    else
      address
    end
  end
end
