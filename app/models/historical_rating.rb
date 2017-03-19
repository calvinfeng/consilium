class HistoricalRating < ActiveRecord::Base

    validates :historical_user_id, :movie_id, :value, presence: true

    belongs_to :reviewer,
    foreign_key: :historical_user_id,
    class_name: "HistoricalUser"

    belongs_to :movie,
    foreign_key: :movie_id,
    class_name: "Movie"
    
end
