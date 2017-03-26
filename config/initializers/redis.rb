require 'csv'
# Heroku's new approach to Redis

# $redis = Redis.new(url: ENV["REDIS_URL"])

# This no longer works
# host = "ec2-184-73-182-113.compute-1.amazonaws.com"
# port = 12229
# password = "pb56s1fjj1147takjkahe3r4n38"
# $redis = Redis.new(:host => host, :port => port, :password => password)

$redis = Redis.new(:host => 'localhost', :port => 6379)
$redis.flushdb

def load_ratings(movies)
    csv = CSV.parse(File.read('db/csv/20k-users/training_ratings.csv'), :headers => true)
    csv.each do |row|
        user_id = row['userId'].to_i
        movie_id = row['movieId'].to_i
        rating = row['rating'].to_f

        if movies[movie_id][:ratings].nil?
            movies[movie_id][:ratings] = Hash.new
        end

        movies[movie_id][:ratings][user_id] = rating
    end

    return movies
end

def load_movies()
    movies = Hash.new
    csv = CSV.parse(File.read('db/csv/20k-users/training_movies.csv'), :headers => true)
    csv.each do |row|
        id = row['movieId'].to_i
        title = row['title']
        movies[id] = { title: title }
    end

    return load_ratings(movies)
end

puts "\nLoading data into redis...\n\n"
movie_map = load_movies()

$redis.set('movie_rating_map', movie_map)

# Cache ID's of those movies with plenty historical ratings
most_viewed_movie_ids = []

movie_map.each do |movie_id, info|
    if info[:ratings] && info[:ratings].length > 450
        most_viewed_movie_ids << movie_id
    end
end

$redis.set('most_viewed_movie_ids', most_viewed_movie_ids)
