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
#  stars                  :float
#  state                  :string           not null
#  status                 :integer          default("open"), not null
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

  STATES = %w[california oregon washington].freeze
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
  HERO_DEFAULT_URL = 'https://storage.googleapis.com/west-coast-skateparks/default-header.jpg'.freeze
  MAP_PHOTO_DEFAULT_URL = 'https://storage.googleapis.com/west-coast-skateparks/logo-small.png'.freeze
  STATE_ABBREVS = {
    'california' => 'CA',
    'oregon' => 'OR',
    'washington' => 'WA'
  }.freeze

  enum status: { open: 0, closed: 1 }

  STARS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].freeze

  friendly_id :to_param, use: %i[slugged history finders]

  validates :name, :city, presence: true
  validates :state, presence: true, inclusion: { in: STATES }
  validate :whitelist_obstacles
  validates :stars, numericality: { in: (1..5), step: 0.5 }, allow_blank: true

  has_many :ratings, dependent: :destroy
  has_and_belongs_to_many :favoriters,
                          join_table: 'favorites',
                          class_name: 'User',
                          dependent: :destroy
  has_and_belongs_to_many :visitors,
                          join_table: 'visits',
                          class_name: 'User',
                          dependent: :destroy

  has_many :skatepark_images, dependent: :destroy

  has_attached_file :hero, default_url: HERO_DEFAULT_URL
  validates_attachment_content_type :hero, content_type: /\Aimage/

  has_attached_file :map_photo, default_url: MAP_PHOTO_DEFAULT_URL, styles: { thumb: '300x200>' }
  validates_attachment_content_type :map_photo, content_type: /\Aimage/

  scope :in_state, ->(state) { where(state:) }

  def neighbor_parks
    radius = 0.4
    self.class
        .where.not(id:)
        .where(
          'latitude BETWEEN ? AND ?',
          latitude - radius,
          latitude + radius
        ).where(
          'longitude BETWEEN ? AND ?',
          longitude - radius,
          longitude + radius
        )
  end

  def average_rating
    raw_avg = ratings.average(:stars)
    return if raw_avg.blank?

    (raw_avg * 2).ceil.to_f / 2
  end

  def coordinates?
    [latitude, longitude].all?(&:present?)
  end

  def to_param
    [name.parameterize, city.parameterize, state.parameterize].join('-')
  end

  def to_s
    (name.downcase.include?('skatepark') ? name : "#{name} skatepark").titleize
  end

  def should_generate_new_friendly_id?
    will_save_change_to_name? || super
  end

  private

  def whitelist_obstacles
    return unless obstacles.present?

    obstacles.map do |obstacle|
      errors.add(:whitelist_obstacles, 'The obstacles are fucked') unless OBSTACLES.include?(obstacle)
    end
  end
end
