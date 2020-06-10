# == Schema Information
#
# Table name: skateparks
#
#  id                     :integer          not null, primary key
#  builder                :string
#  designer               :string
#  helmet                 :string
#  hero_content_type      :string
#  hero_file_name         :string
#  hero_file_size         :bigint
#  hero_updated_at        :datetime
#  hours                  :text
#  identifier             :string
#  info                   :text
#  lights                 :string
#  map_photo_content_type :string
#  map_photo_file_name    :string
#  map_photo_file_size    :bigint
#  map_photo_updated_at   :datetime
#  material               :string
#  name                   :string
#  notes                  :text
#  obstacles              :text
#  opened                 :string
#  photo_cred             :string
#  photo_url              :string
#  rating                 :string
#  size                   :string
#  slug                   :string
#  video_url              :string
#  created_at             :datetime
#  updated_at             :datetime
#
# Indexes
#
#  index_skateparks_on_slug  (slug) UNIQUE
#
class Skatepark < ActiveRecord::Base
  extend FriendlyId

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

  friendly_id :to_param, use: [:slugged, :finders]

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
    if ratings.exists?
      raw_avg = ratings.average(:stars)
      (raw_avg * 2).ceil.to_f / 2
    end
  end

  def present_attributes
    attributes.slice(*VISIBLE_ATTRIBUTES).select { |_k, v| v.present? }
  end

  def ratings?
    ratings.exists?
  end

  def pictures?
    skatepark_images.exists?
  end

  def more_than_one_picture?
    skatepark_images.count > 1
  end

  def to_param
    [name.parameterize, city.parameterize, state.parameterize].join("-")
  end

  def to_s
    (name.downcase.include?("skatepark") ? name :  "#{name} skatepark").titleize
  end
end
