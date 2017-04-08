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

def load_ratings_into_movies(movies)
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

    return load_ratings_into_movies(movies)
end

def load_average_ratings_by_user_id
    historical_ratings_by_user_id = Hash.new
    csv = CSV.parse(File.read('db/csv/20k-users/training_ratings.csv'), :headers => true)
    csv.each do |row|
        user_id = row['userId'].to_i
        movie_id = row['movieId'].to_i
        rating = row['rating'].to_f

        if historical_ratings_by_user_id[user_id].nil?
            historical_ratings_by_user_id[user_id] = Hash.new
        end
        historical_ratings_by_user_id[user_id][movie_id] = rating
    end

    average_rating_map = Hash.new
    historical_ratings_by_user_id.each do |user_id, movie_ratings|
        sum = movie_ratings.values.reduce(:+)
        average_rating_map[user_id] = sum / movie_ratings.length
    end

    return average_rating_map
end


def load_movie_features
    movie_features = Hash.new
    csv = CSV.parse(File.read('db/csv/20k-users/movie_features.csv'), :headers => true)
    csv.each do |row|
        movie_id = row["movieId"].to_i
        i = 1
        feature_vector = []
        while i < row.length
            feature_vector << row[i].to_f
            i += 1
        end
        movie_features[movie_id] = feature_vector
    end
    movie_features
end

puts "\nLoading movie_rating_map into redis...\n\n"
movie_map = load_movies()
$redis.set('movie_rating_map', movie_map)

puts "\nLoading movie_features into redis\n\n"
features = load_movie_features
$redis.set('movie_features', features)

puts "\nLoading average_rating_map into redis\n\n"
average_rating_map = load_average_ratings_by_user_id
$redis.set('average_rating_map', average_rating_map)

puts "\nLoading most_viewed_movie_ids into redis\n\n"
# Cache ID's of those movies with plenty historical ratings
most_viewed_movie_ids = []
movie_map.each do |movie_id, info|
    if info[:ratings] && info[:ratings].length > 450
        most_viewed_movie_ids << movie_id
    end
end
$redis.set('most_viewed_movie_ids', most_viewed_movie_ids)
