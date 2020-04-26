# == Schema Information
#
# Table name: locations
#
#  id           :integer          not null, primary key
#  address      :string
#  city         :string
#  latitude     :float
#  longitude    :float
#  state        :string
#  zip_code     :string
#  skatepark_id :integer
#
# Indexes
#
#  index_locations_on_skatepark_id  (skatepark_id)
#
# Foreign Keys
#
#  fk_rails_...  (skatepark_id => skateparks.id)
#
class Location < ActiveRecord::Base
  STATE_ABBREVS = {
    "california" => "CA",
    "oregon" => "OR",
    "washington" => "WA",
  }.freeze

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
    (address + ", " + 
      city.titleize + ", " + 
      STATE_ABBREVS[state] + " " + 
      (zip_code || "")
    ).strip
  end
end
