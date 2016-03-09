class User < ActiveRecord::Base
  has_secure_password
  validates :username, :password, :email, presence: true
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /\A.+@.+\..{2,}\z/

  has_many :favorites, dependent: :destroy
  has_many :favorite_parks, through: :favorites, source: :skatepark

  has_many :visits, dependent: :destroy
  has_many :visited_parks, through: :visits, source: :skatepark

  has_many :ratings, dependent: :destroy
  has_many :rated_parks, through: :ratings, source: :skatepark

  has_many :reviews, dependent: :destroy
  has_many :reviewed_parks, through: :reviews, source: :skatepark

  has_attached_file(
    :avatar,
    styles: { thumb: '100x100>' },
    default_url: 'https://33.media.tumblr.com/avatar_ee7f0ba1cb58_128.png')
  validates_attachment_content_type :avatar, content_type: %r{\Aimage/.*\Z}

  def admin?
    admin
  end

  def display_name
    name ? name : username
  end

  def first_marker_coordinates
    favorite = favorite_parks.first
    return [favorite.latitude, favorite.longitude] if favorite
    visit = visited_parks.first
    return [visit.latitude, visit.longitude] if visit

    [37.7833, -122.4167] # SF BRO!!!!
  end

  def favorites?
    favorites.any?
  end

  def visits?
    visits.any?
  end

  def map_data
    {
      skateparks: {
        favorite: (favorite_parks - dups).map(&:hashify_with_pictures),
        visited: (visited_parks - dups).map(&:hashify_with_pictures),
        both: dups.map(&:hashify_with_pictures)
      },
      mapCenter: first_marker_coordinates,
      zoom: 6
    }
  end

  def dups
    @dups ||= favorite_parks & visited_parks
  end
end
