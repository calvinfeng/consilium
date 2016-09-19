require 'byebug'
class Api::RecommendersController < ApplicationController
  def for_new_visitor
    #fetch movies for new visitors to rate
    @movies = Movie.movies_with_many_reviews
    render "api/recommender/movies.json.jbuilder"
  end

  def recommendations
    @movies = []
    rated = Hash.new
    recommender_params[:rated].each do |key, val|
      rated[key.to_i] = val.to_f
    end
    queue = Hash.new
    recommender_params[:queue].each do |key, val|
      queue[key.to_i] = val
    end
    current_user = User.new(nil, rated)
    generate_recommendations(current_user, 21 - queue.size, queue)
    render "api/recommender/movies.json.jbuilder"
  end

  private
  def generate_recommendations(user, items_needed, queue)
    movies_collection = eval($redis.get('movies'))
    movie_ids = eval($redis.get('movie_ids'))
    calculated = {}
    prediction_attempted, prediction_failed = 0, 0
    until @movies.size > items_needed
      id = movie_ids.sample
      prediction_attempted += 1
      movie = Movie.new(
        id,
        movies_collection[id][:title],
        movies_collection[id][:year],
        movies_collection[id][:viewers],
        movies_collection[id][:avg_rating],
        movies_collection[id][:imdb_id]
      )
      predicted_rating = movie.predicted_rating_for(user)
      if predicted_rating.is_a? Numeric
        unless user.ratings[id] || queue[id] || calculated[id] || predicted_rating < user.avg_rating
          @movies << movie
        end
        calculated[id] = true
      else
        prediction_failed += 1
      end
    end
    puts "Prediction attempted: #{prediction_attempted}, failed: #{prediction_failed}"
  end

  def recommender_params
    params.require(:recommender)
  end
end
