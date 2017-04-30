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

    def recommendations
        preference_vector = params[:preference_vector]
        min_year = params[:min_year]
        max_year = params[:max_year]
        movie_features = eval($redis.get("movie_features"))

        movie_features.each do |movie_id, feature_vector|
            prediction = 0
            feature_vector.each_index do |idx|
                prediction += preference_vector[idx] * feature_vector[idx]
            end
            puts prediction
        end

        puts "Movie year range #{min_year} - #{max_year}"
        puts "Total number of movies #{movie_features.values.length}"

        # NOTE: Change it back later
        # @movies = generate_recommendations(min_year, max_year, movie_ratings)
        @movies = Movie.find(eval($redis.get("most_viewed_movie_ids"))).first(10)
        render 'api/movies/recommendation.json.jbuilder'
    end

    def fetch_most_viewed
        @movies = Movie.find(eval($redis.get("most_viewed_movie_ids")))
        render 'api/movies/most_viewed.json.jbuilder'
    end

    private
    def generate_recommendations(min_year, max_year, movie_ratings_by_user)
        min_year = min_year || 1900
        max_year = max_year || 2017
        movies = Movie.where("year >= #{min_year} AND year <= #{max_year}")
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
