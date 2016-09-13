class Movie
  attr_reader :id, :title, :ratings, :viewers, :avg_rating

  def initialize(movie_id, title, ratings, viewers, avg_rating)
    @id = movie_id
    @title = title
    @ratings = ratings
    @viewers = viewers
    @avg_rating = avg_rating
  end

  def self.top_rated(n)
    movies_hash = eval($redis.get("movies"))
    sorted_movies = []
    if $redis.get("sorted_movie_ids")
      sorted_movie_ids = eval($redis.get("sorted_movie_ids"))
      sorted_movie_ids.each do |id|
          sorted_movies << Movie.new(id, movies_hash[id][:title], movies_hash[id][:ratings],
            movies_hash[id][:viewers], movies_hash[id][:avg_rating])
      end
    else
      movies = []
      movies_hash.each do |id, info|
        movies << Movie.new(id, info[:title], info[:ratings], info[:viewers], info[:avg_rating])
      end
      sorted_movies = Movie.sort(movies)
      sorted_movie_ids = sorted_movies.map {|movie| movie.id}
      $redis.set("sorted_movie_ids", sorted_movie_ids)
    end
    return sorted_movies.take(n)
  end

  private
  def self.sort(movies)
    if movies.length <= 1
      return movies
    else
      pivot = movies.first
      left = movies.select {|movie| movie.avg_rating > pivot.avg_rating}
      middle = movies.select {|movie| movie.avg_rating == pivot.avg_rating}
      right = movies.select {|movie| movie.avg_rating < pivot.avg_rating}
      return Movie.sort(left) + middle + Movie.sort(right)
    end
  end

end
