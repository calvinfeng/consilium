# FEATURES = {
#   35836 => [0.6, 0.8, -0.2, -0.2, 0.3, -0.2, 0.7, -0.6],
#   51084 => [1, 0.75, -0.35, -0.2, 0.75, 0, 0.25, -0.75],
#   4816 => [0.25, 0.9, 0.1, 0, -0.4, 0.3, 0.4, 0.3],
#   5942 => [0.35, 1, -0.35, 0.15, -0.4, 0, 0, -0.6],
#   69945 => [0.4, 0.3, 0.1, 0, 0.1, 1 ,0.8, 0.7],
#   74458 => [0, -0.8, 1, 0, 1, 0.4, 0.75, 0.8],
#   84187 => [0.5, -0.7, 0.8, 1, 0.9, 0.85, 0.75, 0],
#   58559 => [0.7, -0.8, 0.8, 0.5, 1, 1, 0.85, 1],
#   122882 => [-0.7, -0.7, 0.1, 0, 0.8, 1, 0.9, 0],
#   91947 => [0, -0.9, 0.5, -0.2, 0.9, 0.75, 0.9, 0.6]
# }

# FEATURES = {
#   1 => [1, 0, 0, 0, 0, 0, 0, 0],
#   2 => [0, 1, 0, 0, 0, 0, 0, 0],
#   3 => [0, 0, 1, 0, 0, 0, 0, 0]
# }
#
#
# RATINGS_OF_MOVIES = {
#   35836 => 2.5,
#   51084 => 4.5,
#   4816 => 1,
#   5942 => 4,
#   69945 => 2.5,
#   74458 => 4.8,
#   84187 => 4.6,
#   58559 => 5,
#   122882 => 2.3,
#   91947 => 3.3
# }

class Movie
  attr_reader :id, :features

  def initialize(movie_id, features_of_movies)
    @id = movie_id
    @features = features_of_movies[movie_id]
  end

  def predicted_rating_for(user)
    sum = 0
    self.features.each_with_index do |feature, idx|
      sum += feature * user.preferences[idx]
    end
    sum
  end
end

class User
  attr_reader :id, :ratings, :avg_rating, :preferences
  def initialize(user_id, movie_ratings)
    @id = user_id
    @ratings = movie_ratings
    @avg_rating = compute_avg_rating
    @preferences = compute_preferences
  end

  def compute_avg_rating
    avg_rating = 0
    @ratings.each do |movie_id, rating|
      avg_rating += rating
    end
    avg_rating = avg_rating/@ratings.length
    return avg_rating
  end

  def cost
    sq_error_sum = 0
    l = 0.1
    @ratings.each do |movie_id, rating|
      movie = Movie.new(movie_id, FEATURES)
      sq_error_sum += (movie.predicted_rating_for(self) - rating)**2
    end
    regularized_sum = 0
    @preferences.each do |pref|
      regularized_sum += pref**2
    end
    return sq_error_sum + l*regularized_sum
  end

  def compute_preferences
    @preferences = Array.new(8) { rand }
    alpha = 0.1
    500.times do |i|
      pref = @preferences.dup
      cost = cost_hash
      pref.each_index do |preference_idx|
        pref[preference_idx] -= alpha * dF(preference_idx, cost)
      end
      @preferences = pref
      puts "Iteration: #{i} cost: #{self.cost}"
    end
    @preferences
  end

  def cost_hash
    hash = {}
    @ratings.each do |movie_id, user_rating|
      movie = Movie.new(movie_id, FEATURES)
      predicted = movie.predicted_rating_for(self)
      hash[movie_id] = predicted - user_rating
    end
    hash
  end

  def dF(preference_idx, cost)
    step, lambda_for_pref = 0, 0.1
    step = lambda_for_pref * @preferences[preference_idx] if preference_idx > 0

    cost.each do |movie_id, cost|
      movie = Movie.new(movie_id, FEATURES)
      step += cost * movie.features[preference_idx]
    end

    step / @ratings.size
  end
end

# movies = Hash.new
# movies[35836] = Movie.new(35836, FEATURES[35836])
# movies[51084] = Movie.new(51084, FEATURES[51084])
# movies[5942] = Movie.new(5942, FEATURES[5942])
# movies[69945] = Movie.new(69945, FEATURES[69945])
# movies[74458] = Movie.new(74458, FEATURES[74458])
# movies[84187] = Movie.new(84187, FEATURES[84187])
# movies[122882] = Movie.new(122882, FEATURES[122882])
# movies[91947] = Movie.new(91947, FEATURES[91947])

# ratings = {
#   1 => 5.0,
#   2 => 1.0,
#   3 => 5.0
# }
#
# steven = User.new(nil, ratings)
# p steven.preferences
#
# FEATURES.each do |movie_id, feature_vec|
#   movie = Movie.new(movie_id, FEATURES)
#   prediction = movie.predicted_rating_for(steven)
#   puts "Movie id: #{movie_id}, prediction: #{prediction}, actual rating: #{ratings[movie_id]}"
# end
