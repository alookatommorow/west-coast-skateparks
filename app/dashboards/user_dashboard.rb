require "administrate/base_dashboard"

class UserDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    favorites: Field::HasMany,
    favorite_parks: Field::HasMany.with_options(class_name: "Skatepark"),
    visits: Field::HasMany,
    visited_parks: Field::HasMany.with_options(class_name: "Skatepark"),
    ratings: Field::HasMany,
    rated_parks: Field::HasMany.with_options(class_name: "Skatepark"),
    reviews: Field::HasMany,
    reviewed_parks: Field::HasMany.with_options(class_name: "Skatepark"),
    id: Field::Number,
    username: Field::String,
    email: Field::String,
    admin: Field::Boolean,
    password_digest: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :favorites,
    :favorite_parks,
    :visits,
    :visited_parks,
  ]

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :favorites,
    :favorite_parks,
    :visits,
    :visited_parks,
    :ratings,
    :rated_parks,
    :reviews,
    :reviewed_parks,
    :id,
    :username,
    :email,
    :admin,
    :password_digest,
    :created_at,
    :updated_at,
  ]

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :favorites,
    :favorite_parks,
    :visits,
    :visited_parks,
    :ratings,
    :rated_parks,
    :reviews,
    :reviewed_parks,
    :username,
    :email,
    :admin,
    :password_digest,
  ]

  # Overwrite this method to customize how users are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(user)
  #   "User ##{user.id}"
  # end
end
