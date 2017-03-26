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

    def generate_recommendations
        ratings = Hash.new
        recommender_params[:movie_ratings].each do |movie_id, rating|
            ratings[movie_id] = rating.to_f
        end
        # Just fetching random movies
        @movies = Movie.first(10)
        render 'api/movies/recommendation.json.jbuilder'
    end

    def fetch_most_viewed
        @movies = Movie.find(eval($redis.get("most_viewed_movie_ids")))
        render 'api/movies/most_viewed.json.jbuilder'
    end

    private
    def recommender_params
        params.require(:recommender)
    end
end
