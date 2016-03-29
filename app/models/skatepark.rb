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

  has_many :skatepark_images, :dependent => :destroy

  has_attached_file :hero, default_url: 'https://storage.googleapis.com/west-coast-skateparks/default-header.jpg'
  #validates_attachment_presence :hero
  validates_attachment_content_type :hero, content_type: /\Aimage/

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
        main: [hashify_with_picture],
        nearby: nearby_parks.map(&:hashify_with_picture)
      },
      mapCenter: [latitude, longitude],
      zoom: 9
    }
  end

  def hashify_with_picture
    attributes.merge(
      picture: map_picture)
  end

  def map_picture
    pics? ? first_pic : "#{bucket_url}/logo-small.png"
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

  def pics?
    skatepark_images.any?
  end

  def first_pic
    skatepark_images[0].photo.url
  end

  def reviews?
    reviews.any?
  end

  def coordinates?
    latitude && longitude
  end

  private

    def bucket_url
      'https://storage.googleapis.com/west-coast-skateparks'
    end
end
