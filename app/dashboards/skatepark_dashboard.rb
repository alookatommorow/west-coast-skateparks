require 'administrate/base_dashboard'

class SkateparkDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    hero: PaperclipField,
    map_photo: PaperclipField,
    ratings: Field::HasMany,
    skatepark_images: Field::HasMany,
    city: Field::String,
    state: Field::Select.with_options(collection: %w[california oregon washington]),
    address: Field::String,
    zip_code: Field::String,
    latitude: Field::Number.with_options(decimals: 2),
    longitude: Field::Number.with_options(decimals: 2),
    id: Field::Number,
    name: Field::String,
    identifier: Field::String,
    stars: Field::Select.with_options(collection: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]),
    material: Field::String,
    designer: Field::String,
    builder: Field::String,
    opened: Field::String,
    hours: Field::Text,
    size: Field::String,
    notes: Field::Text,
    info: Field::Text,
    helmet: Field::String,
    lights: Field::String,
    photo_cred: Field::String,
    photo_url: Field::String,
    video_url: Field::String,
    obstacles: PredefinedArray.with_options(
      members: Skatepark::OBSTACLES
    ),
    favoriters: Field::HasMany.with_options,
    visitors: Field::HasMany.with_options,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
    id
    map_photo
    name
    city
    state
    address
    latitude
    longitude
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
    skatepark_images
    city
    state
    address
    zip_code
    latitude
    longitude
    id
    name
    stars
    material
    designer
    builder
    opened
    hours
    size
    notes
    info
    helmet
    lights
    photo_cred
    photo_url
    video_url
    obstacles
    ratings
    favoriters
    visitors
    created_at
    updated_at
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
    name
    city
    state
    address
    zip_code
    latitude
    longitude
    hero
    map_photo
    skatepark_images
    stars
    material
    designer
    builder
    opened
    hours
    size
    notes
    info
    helmet
    lights
    photo_cred
    photo_url
    video_url
    obstacles
  ].freeze

  # Overwrite this method to customize how skateparks are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(skatepark)
    skatepark.name.titleize
  end
end
