class User < ActiveRecord::Base
  has_secure_password
  validates :username, :email, presence: true
  validates :password, presence: true, on: :create
  validates :username, :email, uniqueness: true
  validates_format_of :email, with: /\A.+@.+\..{2,}\z/

  has_and_belongs_to_many :favorites, join_table: "favorites", class_name: "Skatepark"

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

  def has_favorite?(skatepark_id)
    favorites.exists?(skatepark_id)
  end

  def visits?
    visits.any?
  end
end
