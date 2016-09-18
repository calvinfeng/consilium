class Api::RecommendersController < ApplicationController
  def for_new_visitor
    @movies = Movie.movies_with_many_reviews
    render "api/recommender/movies.json.jbuilder"
  end
end
