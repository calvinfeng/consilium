# ==============================================================================
# This is not an usual Rails model. It doesn't inherit from ActiveRecord::Base
# The purpose of this model class is to perform business logic; the core logic
# of the recommender system.
# ==============================================================================
class User
    attr_reader :ratings, :average_rating, :preference_vector
    def initialize(movie_ratings)
        @ratings = Hash.new
        movie_ratings.each do |movie_id, rating|
            @ratings[movie_id.to_s.to_i] = rating
        end

        # Compute other instance properties
        compute_average_rating
        compute_preference_vector
    end

    def compute_average_rating
        sum = 0
        @ratings.each do |movie_id, rating|
            sum += rating
        end
        @average_rating = sum/@ratings.length
    end

    def compute_preference_vector
        @preference_vector = Array.new(8) { rand }
        movie_features = eval($redis.get("movie_features"))
        learning_rate = 0.1
        regularized_factor = 0.15
        1000.times do |i|
            pref_copy = @preference_vector.dup
            deviations = get_deviations(movie_features)
            pref_copy.each_index do |k|
                pref_copy[k] = pref_copy[k] - (learning_rate * derivative_j_wrt_preference(movie_features, k, deviations, regularized_factor))
            end
            @preference_vector = pref_copy
            puts "Cost: #{cost_function(movie_features, regularized_factor)}"
        end
        @preference_vector
    end

    def derivative_j_wrt_preference(movie_features, k, deviations, l)
        # Regularized term
        if k > 0
            dj = l * @preference_vector[k]
        else
            dj = 0
        end
        # Sum over all the movies user has rated
        deviations.each do |movie_id, deviation|
            dj += deviation * movie_features[movie_id][k]
        end
        # Average it
        return dj / @ratings.size
    end

    def get_deviations(movie_features)
        deviation_map = {}
        @ratings.each do |movie_id, user_rating|
            predicted_rating = 0
            @preference_vector.each_index do |k|
                predicted_rating += @preference_vector[k] * movie_features[movie_id][k]
            end
            deviation_map[movie_id] = predicted_rating - user_rating
        end
        return deviation_map
    end

    def cost_function(movie_features, regularized_factor)
        sq_error_sum = 0
        @ratings.each do |movie_id, rating|
            predicted_rating = 0
            @preference_vector.each_index do |k|
                predicted_rating += @preference_vector[k]*movie_features[movie_id][k]
            end
            sq_error_sum += (predicted_rating - rating)**2
        end
        regularized_sum = 0
        @preference_vector.each do |pref|
            regularized_sum += pref**2
        end
        return (sq_error_sum + regularized_factor * regularized_sum)/@ratings.length
    end

    # def sim(other_user)
    #     user_correlation = 0
    #     this_variance, other_variance = 0, 0
    #     movies_seen_by_both = []
    #     @ratings.each do |movie_id, rating|
    #         if other_user.ratings[movie_id]
    #             movies_seen_by_both << movie_id
    #         end
    #     end
    #     # zero means no correlation due to statistical insignificance
    #     return 0 if movies_seen_by_both.length < 3
    #
    #     movies_seen_by_both.each do |movie_id|
    #         this_rating, other_rating = @ratings[movie_id], other_user.ratings[movie_id]
    #         user_correlation += (this_rating - @average_rating)*(other_rating - other_user.avg_rating)
    #         this_variance += (this_rating - @average_rating)**2
    #         other_variance += (other_rating - other_user.avg_rating)**2
    #     end
    #     # if one of the variance is zero, it's an undefined correlation
    #     return 0 if this_variance == 0 || other_variance == 0
    #     return user_correlation/(Math.sqrt(this_variance)*Math.sqrt(other_variance))
    # end

    def sim(historical_user, movie_rating_map)
        correlation = 0
        user_variance, historical_user_variance = 0, 0
        data_count = 0
        @ratings.each do |movie_id, rating|
            if movie_rating_map[movie_id][:ratings][historical_user.id]
                user_rating, historical_user_rating = @ratings[movie_id], movie_rating_map[movie_id][:ratings][historical_user.id]
                correlation += (user_rating - @average_rating) * (historical_user_rating - historical_user.average_rating)
                user_variance += (user_rating - @average_rating)**2
                historical_user_variance += (historical_user_rating - historical_user.average_rating)**2
                data_count += 1
            end
        end

        # Zero means no correlation due to statistical insignificance
        return 0 if data_count < 5
        # If variance is zero for either one of them, it's an undefined correlation
        return 0 if user_variance == 0 || historical_user_variance == 0

        return correlation / (Math.sqrt(user_variance) * Math.sqrt(historical_user_variance))
    end
end
