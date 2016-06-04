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
    favorites: Field::HasMany,
    users_who_faved: Field::HasMany.with_options(class_name: "User"),
    visits: Field::HasMany,
    users_who_visited: Field::HasMany.with_options(class_name: "User"),
    ratings: Field::HasMany,
    users_who_rated: Field::HasMany.with_options(class_name: "User"),
    reviews: Field::HasMany,
    users_who_reviewed: Field::HasMany.with_options(class_name: "User"),
    skatepark_images: Field::HasMany,
    location: Field::HasOne,
    id: Field::Number,
    name: Field::String,
    identifier: Field::String,
    rating: Field::String,
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
    num_pics: Field::Number,
    obstacles: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :location,
    :name,
    :favorites,
    :visits,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :favorites,
    :users_who_faved,
    :visits,
    :users_who_visited,
    :ratings,
    :users_who_rated,
    :reviews,
    :users_who_reviewed,
    :skatepark_images,
    :location,
    :id,
    :name,
    :identifier,
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
    :num_pics,
    :obstacles,
    :created_at,
    :updated_at,

  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :hero,
    :map_photo,
    :skatepark_images,
    :location,
    :name,
    :identifier,
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
    :num_pics,
    :obstacles,
  ].freeze

  # Overwrite this method to customize how skateparks are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(skatepark)
  #   "Skatepark ##{skatepark.id}"
  # end
end
