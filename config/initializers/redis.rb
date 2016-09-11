require 'csv'
$redis = Redis.new(:host => 'localhost', :port => 6379)

$redis.flushdb
csv_file = File.read('config/csv/ml-latest-small/movies.csv')
csv = CSV.parse(csv_file, :headers => true)
movies = Hash.new
csv.each do |row|
  id = row["movieId"].to_i
  title = row["title"]
  movies[id] = {title: title}
end

$redis.set('movies', movies)
