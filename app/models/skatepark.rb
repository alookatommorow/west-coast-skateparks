class Skatepark < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper
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

  def pictures
    if !self.num_pics.blank? && self.num_pics > 0
      (1..self.num_pics).map do |i|
        "https://storage.googleapis.com/west-coast-skateparks/"\
        "#{self.state}/#{self.identifier}-0#{i.to_s}.jpg"
      end
    else
      []
    end
  end

  def visibile_attributes
    untouched = { 'Address' => self.address, 'Info' => self.info, 'Hours' => self.hours }
    titleized = {
      'Material' => self.material, 'Designer' => self.designer,
      'Builder' => self.builder, 'Opened' => self.opened,
      'Size' => delimit_number,
      'Lights' => self.lights, 'Obstacles' => self.obstacles
    }
    titleized.each {|k, v| titleized[k] = v.titleize if v }
    untouched.merge(titleized)
  end

  # remove this method once data is properly structured
  def delimit_number
    "#{number_with_delimiter(self.size, delimiter: ',')} sq ft" if self.size
  end

  def get_lat_long
    lat_long = []
    coords = MultiGeocoder.geocode(self.address)
    lat_long.push(coords.lat)
    lat_long.push(coords.lng)
    lat_long
  end
end
