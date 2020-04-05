class Skatepark < ActiveRecord::Base
  LOCATION_ATTRIBUTES = %i(address city state zip_code latitude longitude)
  LOCATION_METHODS = %i(has_coordinates? new_coordinates?)
  VISIBLE_ATTRIBUTES = %w(
    hours
    material
    designer
    builder
    opened
    size
    lights
    obstacles
  )

  validates :name, presence: true

  has_many :ratings, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_and_belongs_to_many :favoriters,
    join_table: "favorites", class_name: "User", dependent: :destroy
  has_and_belongs_to_many :visitors,
    join_table: "visits", class_name: "User", dependent: :destroy

  has_many :skatepark_images, dependent: :destroy
  has_one :location, dependent: :destroy
  accepts_nested_attributes_for :location

  delegate(*LOCATION_ATTRIBUTES, *LOCATION_METHODS, to: :location, allow_nil: true)

  has_attached_file :hero, default_url: "https://storage.googleapis.com/west-coast-skateparks/default-header.jpg"
  validates_attachment_content_type :hero, content_type: /\Aimage/

  has_attached_file :map_photo, default_url: "https://storage.googleapis.com/west-coast-skateparks/logo-small.png", styles: { thumb: "300x200>" }
  validates_attachment_content_type :map_photo, content_type: /\Aimage/

  scope :in_state, -> (state) { joins(:location).merge(Location.in_state(state)) }

  def neighbor_parks
    self.class.
      joins(:location).
      includes(:location).
      where.not(id: self.id).
      merge(Location.neighbors_of(self.location))
  end

  def average_rating
    if ratings.any?
      raw_avg = ratings.average(:rating)
      (raw_avg * 2).ceil.to_f / 2
    end
  end

  def next_park
    next_park = ordered_parks[ordered_parks.index(self) + 1]
    next_park ? next_park : ordered_parks.first
  end

  def previous_park
    previous_park = ordered_parks[ordered_parks.index(self) - 1]
    previous_park ? previous_park : ordered_parks.last
  end

  def present_attributes
    attributes.slice(*VISIBLE_ATTRIBUTES).select { |_k, v| v.present? }
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

  private

    def ordered_parks
      @ordered_parks ||= Skatepark.includes(:location).order("locations.state", "locations.city", :name)
    end
end
