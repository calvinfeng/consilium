class CreateHistoricalRatings < ActiveRecord::Migration
    def change
        create_table :historical_ratings do |t|
            t.integer :movie_id, null: false
            t.integer :historical_user_id, null: false
            t.float :value
            t.timestamps null: false
        end

        add_index :historical_ratings, :movie_id
        add_index :historical_ratings, :historical_user_id
    end
end
