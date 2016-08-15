class Skatepark < ActiveRecord::Base
  LOCATION_ATTRIBUTES = %i(address city state zip_code latitude longitude)

  validates :name, presence: true, uniqueness: true

  has_many :favorites, dependent: :destroy
  has_many :users_who_faved, through: :favorites, source: :user
  has_many :visits, dependent: :destroy
  has_many :users_who_visited, through: :visits, source: :user
  has_many :ratings, dependent: :destroy
  has_many :users_who_rated, through: :ratings, source: :user
  has_many :reviews, dependent: :destroy
  has_many :users_who_reviewed, through: :reviews, source: :user
  has_many :skatepark_images, dependent: :destroy
  has_one :location, dependent: :destroy

  delegate(*LOCATION_ATTRIBUTES, :has_coordinates?, to: :location, allow_nil: true)

  has_attached_file :hero, default_url: "https://storage.googleapis.com/west-coast-skateparks/default-header.jpg"
  # validates_attachment_presence :hero
  validates_attachment_content_type :hero, content_type: /\Aimage/

  has_attached_file :map_photo, default_url: "https://storage.googleapis.com/west-coast-skateparks/logo-small.png", styles: { thumb: "300x200>" }
  # validates_attachment_presence :map_photo
  validates_attachment_content_type :map_photo, content_type: /\Aimage/

  scope :in_state, -> (state) { joins(:location).where("locations.state = ?", state) }

  scope :nearby_to, -> (object) {
    joins(:location).
      where('locations.latitude BETWEEN ? AND ?', object.latitude - 0.4, object.latitude + 0.4).
      where('locations.longitude BETWEEN ? AND ?', object.longitude - 0.4, object.longitude + 0.4)
  }

  def nearby_parks
    Skatepark.includes(:location).nearby_to(self).where.not(id: id)
  end

  def self.in_order
    includes(:location).order("locations.state", "locations.city", :name)
  end

  def map_data
    {
      skateparks: {
        main: [hashify_with_picture],
        nearby: nearby_parks.map(&:hashify_with_picture),
      },
      mapCenter: [latitude, longitude],
      zoom: 9,
    }
  end

  def hashify_with_picture
    {
      slug: to_param,
      name: name,
      city: city,
      state: state,
      latitude: latitude,
      longitude: longitude,
      picture: map_photo(:thumb),
      rating: rating
    }
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

  def pictures?
    skatepark_images.any?
  end

  def more_than_one_picture?
    skatepark_images.count > 1
  end

  def to_param
    if city
      [id, name.parameterize, city.parameterize].join("-")
    else
      [id, name.parameterize].join("-")
    end
  end

  def next_park
    ordered_parks = Skatepark.in_order
    next_park = ordered_parks[ordered_parks.index(self) + 1]
    if next_park
      next_park
    else
      ordered_parks.first
    end
  end

  def previous_park
    ordered_parks = Skatepark.in_order
    previous_park = ordered_parks[ordered_parks.index(self) - 1]
    if previous_park
      previous_park
    else
      ordered_parks.last
    end
  end
end
