class Skatepark < ActiveRecord::Base

  include Geokit::Geocoders

  validates :city, :state, presence: true
  validates :identifier, uniqueness: true
  has_many :user_skateparks, dependent: :destroy
  has_many :users, through: :user_skateparks

  def self.search(target)
    where(
      'name LIKE ? OR city LIKE ? OR state LIKE ?',
      '%' + target + '%',
      '%' + target + '%',
      '%' + target + '%'
    ).order('state ASC').order('city ASC').order('name ASC')
  end

  def get_lat_long
    lat_long = []
    coords = MultiGeocoder.geocode(self.address)
    lat_long.push(coords.lat)
    lat_long.push(coords.lng)
    lat_long
  end
end
