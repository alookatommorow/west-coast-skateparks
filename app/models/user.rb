class User < ActiveRecord::Base
  has_secure_password
  validates :username, :password, :email, presence: true
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /\A.+@.+\..{2,}\z/

  has_many :favorites
  has_many :favorite_parks, through: :favorites, source: :skatepark

  has_many :visits
  has_many :visited_parks, through: :visits, source: :skatepark

  has_many :ratings
  has_many :rated_parks, through: :ratings, source: :skatepark

  has_many :reviews
  has_many :reviewed_parks, through: :reviews, source: :skatepark

  def is_admin?
    admin
  end

  def first_marker_coordinates
    favorite = favorite_parks.first
    return [favorite.latitude, favorite.longitude] if favorite
    visit = visited_parks.first
    return [visit.latitude, visit.longitude] if visit

    [37.7833, -122.4167] # SF BRO!!!!
  end

  def has_favorites?
    favorites.any?
  end

  def has_visits?
    visits.any?
  end

  #add spec for this
  def map_data
    {
      skateparks: {
        favorite: (favorite_parks - dups).map(&:map_json),
        visited: (visited_parks - dups).map(&:map_json),
        both: dups.map(&:map_json)
      },
      mapCenter: first_marker_coordinates,
      zoom: 6
    }
  end

  def dups
    @dups ||= favorite_parks & visited_parks
  end

end
