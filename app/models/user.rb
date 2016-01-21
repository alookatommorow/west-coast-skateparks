class User < ActiveRecord::Base
  has_secure_password
  validates :username, :password, :email, presence: true
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /.+@.+\..{2,}/

  has_many :favorites
  has_many :favorite_parks, through: :favorites, source: :skatepark

  has_many :visits
  has_many :visited_parks, through: :visits, source: :skatepark

  has_many :ratings
  has_many :rated_parks, through: :ratings, source: :skatepark

  has_many :reviews
  has_many :reviewed_parks, through: :reviews, source: :skatepark

  def favorites_and_visits
    dups = favorite_parks & visited_parks
    {
      favorite_parks: favorite_parks - dups,
      visited_parks: visited_parks - dups,
      both: dups
    }
  end
end
