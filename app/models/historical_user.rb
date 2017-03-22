class HistoricalUser < ActiveRecord::Base

    has_many :ratings,
    foreign_key: :historical_user_id,
    class_name: "HistoricalRating"

    has_many :movies,
    through: :ratings,
    class_name: "Movie"

    def average_rating
        sum = 0
        self.ratings do | rating |
            sum += rating.value
        end
        sum / self.ratings.count
    end

end
