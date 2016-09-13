require './lib/recommender/movie.rb'
require './lib/recommender/user.rb'

require 'byebug'
class Api::RecommendersController < ApplicationController
  def top_movies
    $movies = eval($redis.get("movies"))
    $users = eval($redis.get("users"))
    top_rated_movies = Movie.top_rated(10)
    debugger
  end
end
