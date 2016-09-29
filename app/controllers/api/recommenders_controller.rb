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
    movie_attr = eval($redis.get('movies'))
    movie_ids = eval($redis.get('movie_ids'))
    features = eval($redis.get('features'))
    calculated = {}

    until @movies.size > items_needed
      id = movie_ids.sample
      unless user.ratings[id] || queue[id] || calculated[id]
        movie = Movie.new(id,
        movie_attr[id][:title],
        movie_attr[id][:year],
        movie_attr[id][:viewers],
        movie_attr[id][:avg_rating],
        movie_attr[id][:imdb_id],
        features[id])
        svd_prediction = movie.svd_prediction_for(user)
        knn_prediction = movie.knn_prediction_for(user)
        calculated[id] = true

        if knn_prediction.nil?
          p "kNN fails, can't find any similar users"
          if svd_prediction > user.avg_rating
            @movies << movie
          end
        else
          if svd_prediction > user.avg_rating && knn_prediction > user.avg_rating
            @movies << movie
          end
        end
      end
    end
  end

  def recommender_params
    params.require(:recommender)
  end
end
