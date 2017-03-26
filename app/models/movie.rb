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

    def average_rating
        return @average_rating unless @average_rating.nil?
        sum = 0
        self.ratings.each do | rating |
            sum += rating.value
        end
        @average_rating = sum / self.ratings.count
        return @average_rating
    end

    # Generate prediction using incremental SVD algorithm
    def svd_prediction_for(user)
      predicted_rating = 0
      self.feature.each_with_index do |feature_k, k|
        predicted_rating += (feature_k * user.preference[k])
      end
      predicted_rating
    end

    def knn_prediction_for(user)
        movie_rating_map = eval($redis.get('movie_rating_map'))
        score = 0
        sim_norm = 0
        # Instead of using k neighbors, this function is using all neighbors
        self.reviewers.each do |reviewer|
            sim = user.sim(reviewer, movie_rating_map)
            if sim >= 0.5
                reviewer_rating = movie_rating_map[self.id][:ratings][reviewer.id]
                score += sim * (reviewer_rating - reviewer.average_rating)
                sim_norm += sim.abs
            end
        end

        if sim_norm == 0
            return nil
        else
            return user.average_rating + (score / sim_norm)
        end
    end

end
