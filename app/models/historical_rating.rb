class HistoricalRating < ActiveRecord::Base

    validates :historical_user_id, :movie_id, :value, presence: true

    belongs_to :reviewer,
    foreign_key: :historical_user_id,
    class_name: "HistoricalUser",
    counter_cache: true

    belongs_to :movie,
    foreign_key: :movie_id,
    class_name: "Movie",
    counter_cache: true

end
