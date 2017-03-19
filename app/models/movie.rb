class Movie < ActiveRecord::Base
    
    validates :title, presence: true
    validates :year, length: { minimum: 4, allow_nil: true }
    validates :imdb_id, uniqueness: true

    has_many :ratings,
    foreign_key: :movie_id,
    class_name: "HistoricalRating"

    has_many :reviewers,
    through: :ratings,
    foreign_key: :historical_user_id,
    class_name: "HistoricalUser"

end
