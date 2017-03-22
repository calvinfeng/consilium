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

end
