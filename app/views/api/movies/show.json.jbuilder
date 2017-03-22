json.extract!(@movie, :id, :title, :year, :imdb_id, :average_rating)
json.reviewers(@movie.ratings, :historical_user_id, :value)
