require 'byebug'
class HistoricalUser < ActiveRecord::Base

    has_many :ratings,
    foreign_key: :historical_user_id,
    class_name: "HistoricalRating"

    has_many :movies,
    through: :ratings,
    class_name: "Movie"

    def average_rating
        return @average_rating unless @average_rating.nil?

        rating_map = $redis.get("average_rating_map")

        if rating_map && eval(rating_map)[self.id]
            @average_rating = eval(rating_map)[self.id]
        else
            sum = 0
            self.ratings.each do | rating |
                sum += rating.value
            end

            @average_rating = sum / self.ratings.count
        end

        return @average_rating
    end
end
