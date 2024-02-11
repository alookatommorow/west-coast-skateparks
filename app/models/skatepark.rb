# == Schema Information
#
# Table name: skateparks
#
#  id                     :integer          not null, primary key
#  address                :string
#  builder                :string
#  city                   :string           not null
#  designer               :string
#  helmet                 :string
#  hero_content_type      :string
#  hero_file_name         :string
#  hero_file_size         :bigint
#  hero_updated_at        :datetime
#  hours                  :text
#  identifier             :string
#  info                   :text
#  latitude               :float
#  lights                 :string
#  longitude              :float
#  map_photo_content_type :string
#  map_photo_file_name    :string
#  map_photo_file_size    :bigint
#  map_photo_updated_at   :datetime
#  material               :string
#  name                   :string           not null
#  notes                  :text
#  obstacles              :string           is an Array
#  opened                 :string
#  photo_cred             :string
#  photo_url              :string
#  rating                 :string
#  size                   :string
#  slug                   :string
#  state                  :string           not null
#  video_url              :string
#  zip_code               :string
#  created_at             :datetime
#  updated_at             :datetime
#
# Indexes
#
#  index_skateparks_on_slug  (slug) UNIQUE
#
class Skatepark < ActiveRecord::Base
  extend FriendlyId

  STATES = %w(california oregon washington)
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
  OBSTACLES = [
    'rails',
    'ledges',
    'banks',
    'bowl',
    'quarterpipes',
    'bank to ledge',
    'bank to curb',
    'double set',
    'pyramid/funbox',
    'manual pad',
    'pool coping',
    'metal coping',
    'noping',
    'euro gap',
    'fullpipe',
    'doorway',
    'stairs',
    'gaps',
    'jersey barrier',
    'parking block',
    'pole jam',
    'spine',
    'cradle',
    'miniramp',
    'tombstone',
    'wallride',
    'snakerun',
    'brick stamped',
    'volcano',
    'vert ramp',
    'lumps',
    'hips'
  ].freeze

  friendly_id :to_param, use: [:slugged, :finders]

  validates :name, :city, presence: true
  validates :state, presence: true, inclusion: { in: STATES }
  validate :whitelist_obstacles

  has_many :ratings, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_and_belongs_to_many :favoriters,
    join_table: "favorites", class_name: "User", dependent: :destroy
  has_and_belongs_to_many :visitors,
    join_table: "visits", class_name: "User", dependent: :destroy

  has_many :skatepark_images, dependent: :destroy

  has_attached_file :hero, default_url: "https://storage.googleapis.com/west-coast-skateparks/default-header.jpg"
  validates_attachment_content_type :hero, content_type: /\Aimage/

  has_attached_file :map_photo, default_url: "https://storage.googleapis.com/west-coast-skateparks/logo-small.png", styles: { thumb: "300x200>" }
  validates_attachment_content_type :map_photo, content_type: /\Aimage/

  scope :in_state, -> (state) { where(state: state) }

  def neighbor_parks
    radius = 0.4
    self.class.
      where.not(id: self.id).
      where(
        "latitude BETWEEN ? AND ?",
        latitude - radius,
        latitude + radius,
      ).where(
        "longitude BETWEEN ? AND ?",
        longitude - radius,
        longitude + radius
      )
  end

  def average_rating
    if ratings?
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

  def has_coordinates?
    [latitude, longitude].all?(&:present?)
  end

  def to_param
    [name.parameterize, city.parameterize, state.parameterize].join("-")
  end

  def to_s
    (name.downcase.include?("skatepark") ? name :  "#{name} skatepark").titleize
  end

  private

  def whitelist_obstacles
    return unless obstacles.present?

    obstacles.map do |obstacle|
      errors.add(:whitelist_obstacles, 'The obstacles are fucked') unless OBSTACLES.include?(obstacle)
    end
  end
end
