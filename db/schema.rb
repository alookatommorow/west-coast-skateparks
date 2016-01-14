# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160114011745) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: true do |t|
    t.integer  "user_id"
    t.integer  "skatepark_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "favorites", ["skatepark_id"], name: "index_favorites_on_skatepark_id", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "skateparks", force: true do |t|
    t.string   "name"
    t.string   "city"
    t.string   "state"
    t.string   "identifier"
    t.string   "rating"
    t.string   "address"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "material"
    t.string   "designer"
    t.string   "builder"
    t.string   "opened"
    t.text     "hours"
    t.string   "size"
    t.text     "notes"
    t.text     "info"
    t.string   "helmet"
    t.string   "lights"
    t.string   "photo_cred"
    t.string   "photo_url"
    t.string   "video_url"
    t.integer  "num_pics"
    t.text     "obstacles"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_skateparks", force: true do |t|
    t.integer  "user_id"
    t.integer  "skatepark_id"
    t.integer  "rating"
    t.string   "username"
    t.string   "review"
    t.string   "review_date"
    t.boolean  "favorite",     default: false
    t.boolean  "visited",      default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.boolean  "admin",           default: false
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
