class HistoricalUser < ActiveRecord::Base

    has_many: :ratings,
    foreign_key: :historical_user_id,
    class_name: "HistoricalRating"

    has_many: :movies,
    through: :ratings,
    class_name: "Movie"

end
