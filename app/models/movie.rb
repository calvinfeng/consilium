# ==============================================================================
# This is not an usual Rails model. It doesn't inherit from ActiveRecord::Base
# The purpose of this model class is to perform business logic; the core logic
# of the recommender system.
# ==============================================================================
class Movie
  attr_reader :id, :title, :ratings, :viewers, :avg_rating

  def initialize(movie_id, title, ratings, viewers, avg_rating)
    @id = movie_id
    @title = title
    @ratings = ratings
    @viewers = viewers
    @avg_rating = avg_rating
  end

  def predicted_rating_for(user)
    users = Rails.cache.read("users")
    score = 0
    sim_norm = 0
    # Instead of using k neighbors, this function is using all neighbors
    @viewers.each do |viewer_id|
      neighbor = users[viewer_id]
      sim = user.sim(neighbor)
      if sim != 0
        score += sim*(neighbor.ratings[@id] - neighbor.avg_rating)
        sim_norm += sim.abs
      end
    end

    if sim_norm == 0
      raise "User hasn't rated enough movies for the system to determine his/her preference"
    else
      return user.avg_rating + (score/sim_norm)
    end
  end

  def self.top_rated(n)
    if Rails.cache.read("movies_by_rating")
      return Rails.cache.read("movies_by_rating").take(n)
    else
      movies = []
      movies_hash = eval($redis.get("movies"))
      movies_hash.each do |id, info|
        movies << Movie.new(id, info[:title], info[:ratings], info[:viewers], info[:avg_rating])
      end
      movies_by_rating = Movie.sort_by_avg_rating(movies)
      Rails.cache.write("movies_by_rating", movies_by_rating)
      return movies_by_rating.take(n)
    end
  end

  private
  def self.sort_by_avg_rating(movies)
    if movies.length <= 1
      return movies
    else
      pivot = movies.first
      left = movies.select {|movie| movie.avg_rating > pivot.avg_rating}
      middle = movies.select {|movie| movie.avg_rating == pivot.avg_rating}
      right = movies.select {|movie| movie.avg_rating < pivot.avg_rating}
      Movie.sort_by_avg_rating(left) + middle + Movie.sort_by_avg_rating(right)
    end
  end

end
