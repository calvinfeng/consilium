# ==============================================================================
# This is not an usual Rails model. It doesn't inherit from ActiveRecord::Base
# The purpose of this model class is to perform business logic; the core logic
# of the recommender system.
# ==============================================================================
class Movie
  attr_reader :id, :title, :year, :viewers, :avg_rating, :imdb_id

  def initialize(movie_id, title, year, viewers, avg_rating, imdb_id)
    @id = movie_id
    @title = title
    @year = year
    @viewers = viewers
    @avg_rating = avg_rating
    @imdb_id = imdb_id
  end

  def predicted_rating_for(user)
    users = Rails.cache.read("users")
    score = 0
    sim_norm = 0
    # Instead of using k neighbors, this function is using all neighbors
    @viewers.each do |viewer_id|
      neighbor = users[viewer_id]
      sim = user.sim(neighbor)
      if sim >= 0.5
        score += sim*(neighbor.ratings[@id] - neighbor.avg_rating)
        sim_norm += sim.abs
      end
    end
    #return statements
    if sim_norm == 0
      return "User hasn't rated enough movies for the system to determine his/her preference"
    else
      return user.avg_rating + (score/sim_norm)
    end
  end

  def self.movies_with_many_reviews
    cached = Rails.cache.read("gauge_set")
    if cached
      return cached
    else
      gauge_set = []
      movies_hash = eval($redis.get('movies_with_many_reviews'))
      movies_hash.each do |id, info|
        gauge_set << Movie.new(id, info[:title], info[:year], info[:viewers],
          info[:avg_rating], info[:imdb_id])
      end
      Rails.cache.write("gauge_set", gauge_set)
      gauge_set
    end
  end
end
