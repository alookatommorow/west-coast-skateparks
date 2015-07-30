class Skatepark < ActiveRecord::Base

  # include Geokit::Geocoders
  validates :city, :state, presence: true
  has_many :user_skateparks, dependent: :destroy
  has_many :users, through: :user_skateparks

  # def get_lat_long
  #   lat_long = []
  #   coords = MultiGeocoder.geocode(self.address)
  #   lat_long.push(coords.lat)
  #   lat_long.push(coords.lng)
  #   lat_long
  # end

end
