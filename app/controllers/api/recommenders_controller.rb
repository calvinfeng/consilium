class Api::RecommendersController < ApplicationController
  def top_movies
    top_rated_movies = Movie.top_rated(10)
  end

  def demonstrate
    calvin_ratings = {
      2959 => 4.5,
      58559 => 3.5,
      2571 => 4.5,
      79132 => 5.0,
      2329 => 4.0,
      92259 => 2.0,
      5971 => 3.0
    }
    calvin = User.new(nil, calvin_ratings)
    @predictions = []
    Movie.top_rated(10).each do |movie|
      prediction = {
        movie_id: movie.id,
        movie_title: movie.title,
        avg_rating: movie.avg_rating,
        predicted_rating: movie.predicted_rating_for(calvin)
      }
      @predictions << prediction
    end
    render "api/recommender/prediction.json.jbuilder"
  end
end
