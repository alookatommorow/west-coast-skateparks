# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_201_005_162_232) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'favorites', id: :serial, force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'skatepark_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['skatepark_id'], name: 'index_favorites_on_skatepark_id'
    t.index %w[user_id skatepark_id], name: 'index_favorites_on_user_id_and_skatepark_id', unique: true
    t.index ['user_id'], name: 'index_favorites_on_user_id'
  end

  create_table 'friendly_id_slugs', id: :serial, force: :cascade do |t|
    t.string 'slug', null: false
    t.integer 'sluggable_id', null: false
    t.string 'sluggable_type', limit: 50
    t.string 'scope'
    t.datetime 'created_at'
    t.index %w[slug sluggable_type scope], name: 'index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope',
                                           unique: true
    t.index %w[slug sluggable_type], name: 'index_friendly_id_slugs_on_slug_and_sluggable_type'
    t.index %w[sluggable_type sluggable_id], name: 'index_friendly_id_slugs_on_sluggable_type_and_sluggable_id'
  end

  create_table 'ratings', id: :serial, force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'skatepark_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.float 'rating'
    t.integer 'stars', null: false
    t.text 'review'
    t.index ['skatepark_id'], name: 'index_ratings_on_skatepark_id'
    t.index %w[user_id skatepark_id], name: 'index_ratings_on_user_id_and_skatepark_id'
    t.index ['user_id'], name: 'index_ratings_on_user_id'
  end

  create_table 'reviews', id: :serial, force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'skatepark_id'
    t.string 'review'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['skatepark_id'], name: 'index_reviews_on_skatepark_id'
    t.index %w[user_id skatepark_id], name: 'index_reviews_on_user_id_and_skatepark_id', unique: true
    t.index ['user_id'], name: 'index_reviews_on_user_id'
  end

  create_table 'skatepark_images', id: :serial, force: :cascade do |t|
    t.string 'caption'
    t.integer 'skatepark_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'photo_file_name'
    t.string 'photo_content_type'
    t.bigint 'photo_file_size'
    t.datetime 'photo_updated_at'
    t.index ['skatepark_id'], name: 'index_skatepark_images_on_skatepark_id'
  end

  create_table 'skateparks', id: :serial, force: :cascade do |t|
    t.string 'name', null: false
    t.string 'identifier'
    t.string 'rating'
    t.string 'material'
    t.string 'designer'
    t.string 'builder'
    t.string 'opened'
    t.text 'hours'
    t.string 'size'
    t.text 'notes'
    t.text 'info'
    t.string 'helmet'
    t.string 'lights'
    t.string 'photo_cred'
    t.string 'photo_url'
    t.string 'video_url'
    t.datetime 'created_at'
    t.datetime 'updated_at'
    t.string 'hero_file_name'
    t.string 'hero_content_type'
    t.bigint 'hero_file_size'
    t.datetime 'hero_updated_at'
    t.string 'map_photo_file_name'
    t.string 'map_photo_content_type'
    t.bigint 'map_photo_file_size'
    t.datetime 'map_photo_updated_at'
    t.string 'slug'
    t.string 'address'
    t.string 'city', null: false
    t.float 'latitude'
    t.float 'longitude'
    t.string 'state', null: false
    t.string 'zip_code'
    t.string 'obstacles', array: true
    t.index ['slug'], name: 'index_skateparks_on_slug', unique: true
  end

  create_table 'users', id: :serial, force: :cascade do |t|
    t.string 'username'
    t.string 'email'
    t.boolean 'admin', default: false
    t.string 'password_digest'
    t.datetime 'created_at'
    t.datetime 'updated_at'
    t.string 'name'
    t.string 'avatar_file_name'
    t.string 'avatar_content_type'
    t.bigint 'avatar_file_size'
    t.datetime 'avatar_updated_at'
    t.index ['email'], name: 'index_users_on_email'
  end

  create_table 'visits', id: :serial, force: :cascade do |t|
    t.integer 'user_id'
    t.integer 'skatepark_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['skatepark_id'], name: 'index_visits_on_skatepark_id'
    t.index %w[user_id skatepark_id], name: 'index_visits_on_user_id_and_skatepark_id', unique: true
    t.index ['user_id'], name: 'index_visits_on_user_id'
  end
end
