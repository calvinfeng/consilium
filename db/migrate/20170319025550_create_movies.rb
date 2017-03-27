class CreateMovies < ActiveRecord::Migration
    def change
        create_table :movies do |t|
            t.string :title, null: false
            t.integer :year
            t.float :imdb_rating
            t.string :imdb_id
            t.float :feature, array: true, default: []
            t.timestamps null: false
        end

        add_index :movies, :title
        add_index :movies, :imdb_id, unique: true
        add_index :movies, :year
    end
end
