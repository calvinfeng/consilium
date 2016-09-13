require './lib/recommender/movie.rb'
require 'byebug'
class Api::RecommendersController < ApplicationController
  def top_movies
    top_rated_movies = Movie.top_rated(10)
    debugger
  end
end
