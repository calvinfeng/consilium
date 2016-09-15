json.array! @predictions do |prediction|
  json.movieId prediction[:movie_id]
  json.movieTitle prediction[:movie_title]
  json.avgRating prediction[:avg_rating]
  json.prediction prediction[:predicted_rating]
end
