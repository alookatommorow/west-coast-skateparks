class Skatepark < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper
  include Geokit::Geocoders

  validates :city, :state, :name, presence: true
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

  def self.in_state(state)
    where(state: state).order('city ASC')
  end

  def nearby_parks
    return [] unless coordinates?
    Skatepark.where(
      'latitude BETWEEN ? AND ?', latitude - 0.4, latitude + 0.4).where(
        'longitude BETWEEN ? AND ?', longitude - 0.4, longitude + 0.4).where(
          'id != ?', id)
  end

  def map_data
    {
      skateparks: {
        main: [hashify_with_pictures],
        nearby: nearby_parks.map(&:hashify_with_pictures)
      },
      mapCenter: [latitude, longitude],
      zoom: 9
    }
  end

  def hashify_with_pictures
    attributes.merge(
      pictures: pictures,
      firstPicture: first_picture)
  end

  def pictures
    return [] unless num_pics && num_pics > 0
    (1..num_pics).map { |i| "#{bucket_url}/#{state}/#{identifier}-0#{i}.jpg" }
  end

  def first_picture
    pictures.first ? pictures.first : "#{bucket_url}/logo-small.png"
  end

  def favorited_by?(user)
    users_who_faved.include?(user)
  end

  def visited_by?(user)
    users_who_visited.include?(user)
  end

  def ratings?
    ratings.any?
  end

  def reviews?
    reviews.any?
  end

  def average_rating
    ratings.map(&:rating).reduce(:+) / ratings.length
  end

  def coordinates?
    latitude && longitude
  end

  private

    def bucket_url
      'https://storage.googleapis.com/west-coast-skateparks'
    end
end
