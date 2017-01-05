class Skatepark < ActiveRecord::Base
  LOCATION_ATTRIBUTES = %i(address city state zip_code latitude longitude)
  LOCATION_METHODS = %i(has_coordinates? new_coordinates?)

  validates :name, presence: true

  has_and_belongs_to_many :favoriters, join_table: "favorites", class_name: "User"
  has_and_belongs_to_many :visitors, join_table: "visits", class_name: "User"
  # has_many :visits, dependent: :destroy
  has_many :users_who_visited, through: :visits, source: :user
  has_many :ratings, dependent: :destroy
  has_many :users_who_rated, through: :ratings, source: :user
  has_many :reviews, dependent: :destroy
  has_many :users_who_reviewed, through: :reviews, source: :user
  has_many :skatepark_images, dependent: :destroy
  has_one :location, dependent: :destroy
  has_many :neighbors
  has_many :neighbor_parks, through: :neighbors, dependent: :destroy
  accepts_nested_attributes_for :location

  after_create :associate_neighbor_parks, if: :has_coordinates?
  before_save :associate_neighbor_parks, if: :new_coordinates?

  delegate(*LOCATION_ATTRIBUTES, *LOCATION_METHODS, to: :location, allow_nil: true)

  has_attached_file :hero, default_url: "https://storage.googleapis.com/west-coast-skateparks/default-header.jpg"
  # validates_attachment_presence :hero
  validates_attachment_content_type :hero, content_type: /\Aimage/

  has_attached_file :map_photo, default_url: "https://storage.googleapis.com/west-coast-skateparks/logo-small.png", styles: { thumb: "300x200>" }
  # validates_attachment_presence :map_photo
  validates_attachment_content_type :map_photo, content_type: /\Aimage/

  scope :in_state, -> (state) { joins(:location).merge(Location.in_state(state)) }

  def self.in_order
    includes(:location).order("locations.state", "locations.city", :name)
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
    [id, name.parameterize, city.parameterize, state.parameterize].join("-")
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

  private

    def associate_neighbor_parks
      self.neighbor_parks.destroy_all # refresh in case coordinates are being edited on existing park
      find_neighbor_parks.each { |skatepark| self.neighbor_parks << skatepark }
    end

    def find_neighbor_parks
      self.class.
        joins(:location).
        where.not(id: self.id).
        merge(Location.neighbors_of(self.location))
    end
end
