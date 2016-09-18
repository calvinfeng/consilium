json.array! @movies do |movie|
  json.movieId movie.id
  json.movieTitle movie.title
end
