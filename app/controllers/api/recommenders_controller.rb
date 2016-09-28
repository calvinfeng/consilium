require 'byebug'
require 'set'
class Api::RecommendersController < ApplicationController
  def for_new_visitor
    #fetch movies for new visitors to rate
    @movies = Movie.movies_with_many_reviews
    render "api/recommender/movies.json.jbuilder"
  end

  def recommendations
    @movies = []
    scores = Set.new
    rated = Hash.new
    recommender_params[:rated].each do |key, val|
      rating = val.to_f
      scores.add(rating)
      rated[key.to_i] = rating
    end

    messages = []
    if rated.size < 6
      messages << "Need at least 6 ratings to calculate"
      render :json => { :errors => messages }, :status => 422
    elsif scores.size == 1
      messages << "Please don't give same exact rating to all movies"
      render :json => { :errors => messages }, :status => 422
    else
      queue = Hash.new
      unless recommender_params[:queue].nil?
        recommender_params[:queue].each do |key, val|
          queue[key.to_i] = val
        end
      end
      current_user = User.new(nil, rated)
      generate_recommendations(current_user, queue)
      render "api/recommender/movies.json.jbuilder"
    end
  end

  private
  def generate_recommendations(user, queue, items_needed=21-queue.size)
    movies_collection = eval($redis.get('movies'))
    movie_ids = eval($redis.get('movie_ids'))
    movie_features = eval($redis.get('features'))
    calculated = {}
    prediction_attempted, prediction_failed = 0, 0

    until @movies.size > items_needed
      id = movie_ids.sample
      unless user.ratings[id] || queue[id] || calculated[id]
        movie = Movie.new(
        id,
        movies_collection[id][:title],
        movies_collection[id][:year],
        movies_collection[id][:viewers],
        movies_collection[id][:avg_rating],
        movies_collection[id][:imdb_id],
        movie_features[id]
        )
        predicted_rating = movie.svd_prediction_for(user)
        prediction_attempted += 1
        calculated[id] = true

        if predicted_rating.is_a? Numeric
          @movies << movie if predicted_rating > user.avg_rating
        else
          prediction_failed += 1
        end
      end
    end
    p "Prediction attempted: #{prediction_attempted}, failed: #{prediction_failed}"
  end

  def recommender_params
    params.require(:recommender)
  end
end
