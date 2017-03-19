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

ActiveRecord::Schema.define(version: 20170319025623) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "historical_ratings", force: :cascade do |t|
    t.integer  "movie_id",           null: false
    t.integer  "historical_user_id", null: false
    t.float    "value"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "historical_ratings", ["historical_user_id"], name: "index_historical_ratings_on_historical_user_id", using: :btree
  add_index "historical_ratings", ["movie_id"], name: "index_historical_ratings_on_movie_id", using: :btree

  create_table "historical_users", force: :cascade do |t|
    t.float    "preference", default: [],              array: true
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "movies", force: :cascade do |t|
    t.string   "title",                    null: false
    t.integer  "year",                     null: false
    t.float    "imdb_rating"
    t.string   "imdb_id"
    t.float    "feature",     default: [],              array: true
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "movies", ["imdb_id"], name: "index_movies_on_imdb_id", unique: true, using: :btree
  add_index "movies", ["title"], name: "index_movies_on_title", using: :btree
  add_index "movies", ["year"], name: "index_movies_on_year", using: :btree

end
