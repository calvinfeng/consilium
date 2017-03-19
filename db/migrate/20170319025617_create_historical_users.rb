class CreateHistoricalUsers < ActiveRecord::Migration
    def change
        create_table :historical_users do |t|
            t.float :preference, array: true, default: []
            t.timestamps null: false
        end
    end
end
