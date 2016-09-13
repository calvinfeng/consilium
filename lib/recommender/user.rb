class User
  attr_reader :id, :ratings, :avg_rating
  def initialize(user_id, movie_ratings)
    @id = user_id
    @ratings = movie_ratings
    @avg_rating = compute_avg_rating
  end

  def compute_avg_rating
    avg_rating = 0
    @ratings.each do |movie_id, rating|
      avg_rating += rating
    end
    avg_rating = avg_rating/@ratings.length
    return avg_rating
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
    return 0 if movies_seen_by_both.length < 5

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
