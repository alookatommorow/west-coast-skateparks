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
  validates_attachment_content_type :avatar, content_type: /\Aimage/

  def admin?
    admin
  end

  def display_name
    name ? name : username
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
        favorite: (favorite_parks - dups).map(&:hashify_with_picture),
        visited: (visited_parks - dups).map(&:hashify_with_picture),
        both: dups.map(&:hashify_with_picture),
      },
      zoom: 6,
    }
  end

  def dups
    @dups ||= favorite_parks & visited_parks
  end
end
