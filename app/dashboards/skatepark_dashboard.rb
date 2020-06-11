require "administrate/base_dashboard"

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
    reviews: Field::HasMany,
    skatepark_images: Field::HasMany,
    city: Field::String,
    state: Field::String,
    address: Field::String,
    latitude: Field::Float,
    longitude: Field::Float,
    id: Field::Number,
    name: Field::String,
    identifier: Field::String,
    rating: Field::Select.with_options(collection: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"]),
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
    obstacles: Field::Text,
    favoriters: Field::HasMany.with_options(class_name: "User"),
    visitors: Field::HasMany.with_options(class_name: "User"),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :id,
    :map_photo,
    :name,
    :city,
    :state,
    :address,
    :latitude,
    :longitude,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :skatepark_images,
    :city,
    :state,
    :address,
    :latitude,
    :longitude,
    :id,
    :name,
    :rating,
    :material,
    :designer,
    :builder,
    :opened,
    :hours,
    :size,
    :notes,
    :info,
    :helmet,
    :lights,
    :photo_cred,
    :photo_url,
    :video_url,
    :obstacles,
    :ratings,
    :reviews,
    :favoriters,
    :visitors,
    :created_at,
    :updated_at,

  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :city,
    :state,
    :address,
    :latitude,
    :longitude,
    :hero,
    :map_photo,
    :skatepark_images,
    :name,
    :rating,
    :material,
    :designer,
    :builder,
    :opened,
    :hours,
    :size,
    :notes,
    :info,
    :helmet,
    :lights,
    :photo_cred,
    :photo_url,
    :video_url,
    :obstacles,
  ].freeze

  # Overwrite this method to customize how skateparks are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(skatepark)
    skatepark.name.titleize
  end
end
