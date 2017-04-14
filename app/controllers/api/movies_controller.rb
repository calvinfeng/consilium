require 'byebug'

class Api::MoviesController < ApplicationController

    def index
        if params[:imdbId]
            movie = Movie.find_by_imdb_id(params[:imdbId])
            @movies = [movie]
        else
            @movies = Movie.all
        end
        render :index
    end

    def show
        if params[:id]
            @movie = Movie.find(params[:id])
            render :show
        elsif params[:imdbId]
            @movie = Movie.find_by_imdb_id(params[:imdbId])
            render :show
        else
            @errors = ["Can't find the requested movie"]
            render 'api/shared/error', status: 422
        end
    end

    # Required params
    # {
    #   start_year: 2010,
    #   end_year: 2015,
    #   movie_ratings: {
    #       1: 4.5,
    #       5: 5.0,
    #       32: 4.5,
    #       109487: 5.0,
    #       109374: 3.5,
    #       112556: 4.5,
    #       112852: 4.0,
    #       116797: 5.0,
    #       91529: 3.5,
    #       87232: 2.0,
    #       81591: 2.5
    #   }
    # }
    def recommendations
        movie_ratings = Hash.new
        params[:movie_ratings].each do |movie_id, rating|
            movie_ratings[movie_id] = rating.to_f
        end

        start_year = params[:start_year]
        end_year = params[:end_year]

        # NOTE: Change it back later
        # @movies = generate_recommendations(start_year, end_year, movie_ratings)
        @movies = Movie.find(eval($redis.get("most_viewed_movie_ids"))).first(10)
        render 'api/movies/recommendation.json.jbuilder'
    end

    def fetch_most_viewed
        @movies = Movie.find(eval($redis.get("most_viewed_movie_ids")))
        render 'api/movies/most_viewed.json.jbuilder'
    end

    private
    # def recommender_params
    #     eval(params.require(:recommender))
    # end

    def generate_recommendations(start_year, end_year, movie_ratings_by_user)
        start_year = start_year || 1900
        end_year = end_year || 2017
        movies = Movie.where("year >= #{start_year} AND year <= #{end_year}")
        indices = (0...movies.length).to_a.shuffle

        recommended_movies = []
        user = User.new(movie_ratings_by_user)
        until recommended_movies.count >= 5 || indices.length == 0
            index = indices.pop
            prediction = movies[index].knn_prediction_for(user)
            puts "\n#{movies[index].title} - prediction = #{prediction}\n\n" unless prediction.nil?
            if !prediction.nil? && movies[index].knn_prediction_for(user) > 3.5
                recommended_movies << movies[index]
            end
        end

        return recommended_movies
    end

end
