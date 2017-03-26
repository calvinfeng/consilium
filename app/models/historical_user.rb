class HistoricalUser < ActiveRecord::Base

    has_many :ratings,
    foreign_key: :historical_user_id,
    class_name: "HistoricalRating"

    has_many :movies,
    through: :ratings,
    class_name: "Movie"

    def average_rating
        return @average_rating unless @average_rating.nil?

        sum = 0
        self.ratings.each do | rating |
            sum += rating.value
        end

        @average_rating = sum / self.ratings.count
        return @average_rating
    end
end
