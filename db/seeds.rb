# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

# Load movies
# csv = CSV.parse(File.read('db/csv/20k-users/training_movies.csv'), :headers => true)
#
# movies = Hash.new
#
# csv.each do |row|
#     id = row['movieId'].to_i
#     title = row['title']
#     year = row['year'].to_i
#     if year < 1000
#         year = nil
#     end
#     movies[id] = {title: title, year: year}
# end
#
# # Load movies' relevant information
# csv = CSV.parse(File.read('db/csv/20k-users/training_links.csv'), :headers => true)
#
# csv.each do |row|
#     id = row['movieId'].to_i
#     imdb_id = row['imdbId']
#     movies[id][:imdb_id] = imdb_id
# end
#
# csv = CSV.parse(File.read('db/csv/20k-users/movie_features.csv'), :headers => true)
#
# csv.each do |row|
#     feature_array = []
#     movie_id = row['movieId'].to_i
#     row.each do |key, value|
#         if key != 'movieId'
#             feature_array << value.to_f
#         end
#     end
#     movies[movie_id][:feature] = feature_array
# end
#
# puts 'Movie information has been loaded'
# movies.each do |id, movie|
#     Movie.create!(id: id, title: movie[:title], year: movie[:year], imdb_id: movie[:imdb_id], feature: movie[:feature])
# end
# puts 'Movies have been inserted into database'

# Load historical users and historical ratings
csv = CSV.parse(File.read('db/csv/20k-users/training_ratings.csv'), :headers => true)

historical_users = Set.new

puts 'User information has been loaded'
csv.each do |row|
    user_id = row['userId'].to_i
    movie_id = row['movieId'].to_i
    rating = row['rating'].to_f

    if !historical_users.include?(user_id)
        HistoricalUser.create!(id: user_id)
        historical_users << user_id
    end

    HistoricalRating.create!(historical_user_id: user_id, movie_id: movie_id, value: rating)
end
