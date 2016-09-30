# ==============================================================================
# This is not an usual Rails model. It doesn't inherit from ActiveRecord::Base
# The purpose of this model class is to perform business logic; the core logic
# of the recommender system.
# ==============================================================================
class User
  attr_reader :id, :ratings, :avg_rating, :preferences
  def initialize(user_id, movie_ratings)
    @id = user_id
    @ratings = movie_ratings
    @avg_rating = compute_avg_rating
    # This indicates that we need to generate a preference, because this is a new user
    if user_id.nil?
      compute_preferences
    else
      @preferences = nil
    end
  end

  def compute_avg_rating
    avg_rating = 0
    @ratings.each do |movie_id, rating|
      avg_rating += rating
    end
    avg_rating = avg_rating/@ratings.length
    return avg_rating
  end

  def compute_preferences
    @preferences = Array.new(8) { rand }
    movie_features = eval($redis.get("features"))
    learning_rate = 0.1
    regularized_factor = 0.15
    500.times do |i|
      pref_copy = @preferences.dup
      deviations = get_deviations(movie_features)
      pref_copy.each_index do |k|
        pref_copy[k] = pref_copy[k] - (learning_rate*derivative_j_wrt_preference(movie_features, k, deviations, regularized_factor))
      end
      @preferences = pref_copy
      puts "Iteration: #{i} cost: #{self.cost_function(movie_features, regularized_factor)}"
    end
  end

  def derivative_j_wrt_preference(movie_features, k, deviations, l)
    if k > 0
      step = l*@preferences[k]
    else
      step = 0
    end
    deviations.each do |movie_id, deviation|
      step += deviation*movie_features[movie_id][k]
    end
    return step / @ratings.size
  end

  def get_deviations(movie_features)
    deviation_map = {}
    @ratings.each do |movie_id, user_rating|
      predicted_rating = 0
      @preferences.each_index do |k|
        predicted_rating += @preferences[k]*movie_features[movie_id][k]
      end
      deviation_map[movie_id] = predicted_rating - user_rating
    end
    return deviation_map
  end

  def cost_function(movie_features, l)
    sq_error_sum = 0
    @ratings.each do |movie_id, rating|
      predicted_rating = 0
      @preferences.each_index do |k|
        predicted_rating += @preferences[k]*movie_features[movie_id][k]
      end
      sq_error_sum += (predicted_rating - rating)**2
    end
    regularized_sum = 0
    @preferences.each do |pref|
      regularized_sum += pref**2
    end
    return sq_error_sum + l*regularized_sum
  end

  def sim(other_user)
    user_correlation = 0
    this_variance, other_variance = 0, 0
    movies_seen_by_both = []
    @ratings.each do |movie_id, rating|
      if other_user.ratings[movie_id]
        movies_seen_by_both << movie_id
      end
    end
    # zero means no correlation due to statistical insignificance
    return 0 if movies_seen_by_both.length < 3

    movies_seen_by_both.each do |movie_id|
      this_rating, other_rating = @ratings[movie_id], other_user.ratings[movie_id]
      user_correlation += (this_rating - @avg_rating)*(other_rating - other_user.avg_rating)
      this_variance += (this_rating - @avg_rating)**2
      other_variance += (other_rating - other_user.avg_rating)**2
    end
    # if one of the variance is zero, it's an undefined correlation
    return 0 if this_variance == 0 || other_variance == 0
    return user_correlation/(Math.sqrt(this_variance)*Math.sqrt(other_variance))
  end
end
