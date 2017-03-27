json.array! @movies do |movie|
  json.id movie.id
  json.title movie.title
  json.year movie.year
  json.imdbId movie.imdb_id
end
