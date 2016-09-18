json.array! @movies do |movie|
  json.movieId movie.id
  json.movieTitle movie.title
  json.imdbId movie.imdb_id
end
