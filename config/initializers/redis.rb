require 'csv'
#$redis = Redis.new(:host => 'localhost', :port => 6379)
host = "ec2-184-73-182-113.compute-1.amazonaws.com"
port = 12229
password = "pb56s1fjj1147takjkahe3r4n38"
$redis = Redis.new(:host => host, :port => port, :password => password)

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
