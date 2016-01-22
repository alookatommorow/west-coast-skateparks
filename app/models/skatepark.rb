class Skatepark < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper
  include Geokit::Geocoders

  validates :city, :state, presence: true
  validates :identifier, uniqueness: true

  has_many :favorites, dependent: :destroy
  has_many :users_who_faved, through: :favorites, source: :user

  has_many :visits, dependent: :destroy
  has_many :users_who_visited, through: :visits, source: :user

  has_many :ratings, dependent: :destroy
  has_many :users_who_rated, through: :ratings, source: :user

  has_many :reviews, dependent: :destroy
  has_many :users_who_reviewed, through: :reviews, source: :user

  def self.search(target)
    where(
      'name LIKE ? OR city LIKE ? OR state LIKE ?',
      '%' + target + '%',
      '%' + target + '%',
      '%' + target + '%'
    ).order('state ASC').order('city ASC').order('name ASC')
  end

  def pictures
    # should default num_pics to 0
    if num_pics && num_pics > 0
      (1..num_pics).map do |i|
        "https://storage.googleapis.com/west-coast-skateparks/"\
        "#{state}/#{identifier}-0#{i.to_s}.jpg"
      end
    else
      []
    end
  end

  def already_favorited_by?(user)
    users_who_faved.include?(user)
  end

  def already_visited_by?(user)
    users_who_visited.include?(user)
  end

  def has_ratings?
    ratings.length > 0
  end

  def has_reviews?
    reviews.length > 0
  end

  def average_rating
    ratings.map(&:rating).reduce(:+)/ratings.length
  end

  def visibile_attributes
    untouched = { 'Address' => self.address, 'Info' => self.info, 'Hours' => self.hours }
    titleized = {
      'Material' => material, 'Designer' => designer,
      'Builder' => builder, 'Opened' => opened,
      'Size' => delimit_size,
      'Lights' => lights, 'Obstacles' => obstacles
    }
    titleized.each {|k, v| titleized[k] = v.titleize if v }
    untouched.merge(titleized)
  end

  def lat_long
    lat_long = []
    coords = MultiGeocoder.geocode(self.address)
    lat_long.push(coords.lat)
    lat_long.push(coords.lng)
    lat_long
  end

  def has_coordinates?
    latitude && longitude
  end

  def is_nearby?(skatepark)
    return unless skatepark.has_coordinates?
    (latitude > skatepark.latitude - 1.0 && latitude < skatepark.latitude + 1.0) &&
      (longitude > skatepark.longitude - 1.0 && longitude < skatepark.longitude + 1.0)
  end

  def nearby_parks
    return unless has_coordinates?
    Skatepark.all.select { |park| is_nearby?(park) }
  end

  private
    # remove this method once data is properly structured
    def delimit_size
      "#{number_with_delimiter(size, delimiter: ',')} sq ft" if size
    end


end
