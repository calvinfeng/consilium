json.array! @movies do |movie|
  json.id movie.id
  json.title movie.title
  json.year movie.year
  json.imdbId movie.imdb_id
  json.averageRating movie.average_rating
  json.ratingCount movie.ratings_count
end
