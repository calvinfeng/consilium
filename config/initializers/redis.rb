require 'csv'
#$redis = Redis.new(:host => 'localhost', :port => 6379)
host = "ec2-184-73-182-113.compute-1.amazonaws.com"
port = 12229
password = "pb56s1fjj1147takjkahe3r4n38"
$redis = Redis.new(:host => host, :port => port, :password => password)

$redis.flushdb

def load_data()
  movies_csv = File.read('config/csv/ml-data/movies.csv')
  csv = CSV.parse(movies_csv, :headers => true)
  movies = Hash.new
  csv.each do |row|
    id = row["movieId"].to_i
    title = row["title"]
    movies[id] = {title: title}
  end
  users = load_movie_ratings_from_users(movies)
  compute_avg_ratings(movies)
  return [movies, users]
end

def load_movie_ratings_from_users(movies)
  ratings_csv = File.read('config/csv/ml-data/ratings.csv')
  csv = CSV.parse(ratings_csv, :headers => true)
  users = Hash.new
  csv.each do |row|
    user_id = row["userId"].to_i
    movie_id = row["movieId"].to_i
    rating = row["rating"].to_f
    # Append ratings to movie
    if movies[movie_id][:ratings]
      movies[movie_id][:ratings] << rating
      movies[movie_id][:viewers] << user_id
    else
      movies[movie_id][:ratings] = [rating]
      movies[movie_id][:viewers] = [user_id]
    end
    # Record user rating pattern
    if users[user_id]
      users[user_id][movie_id] = rating
    else
      users[user_id] = {movie_id => rating}
    end
  end
  return users
end

def compute_avg_ratings(movies)
  movies.each do |id, value|
    if movies[id][:ratings]
      total_rating = 0
      movies[id][:ratings].each do |rating|
        total_rating += rating
      end
      movies[id][:avg_rating] = total_rating/movies[id][:ratings].length
    end
  end
  return nil
end

movies_map, users_map = load_data
# Cache the hash in Redis
$redis.set('movies', movies_map)
#$redis.set('users', users_map)

users = Hash.new
users_map.each do |user_id, user_movie_ratings|
  if (user_id <= 5000)
    users[user_id] = User.new(user_id, user_movie_ratings)
  end
end
# Cache the user objects in Rails
Rails.cache.clear()
Rails.cache.write("users", users)
