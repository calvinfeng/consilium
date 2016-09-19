class Api::RecommendersController < ApplicationController
  def for_new_visitor
    #fetch movies for new visitors to rate
    @movies = Movie.movies_with_many_reviews
    render "api/recommender/movies.json.jbuilder"
  end

  def recommendations
    @movies = []
    rated = recommender_params[:rated]
    queue = recommender_params[:queue]
    all_movies = eval($redis.get('movies'))
    all_ids = eval($redis.get('movie_ids'))

    calculated = {}
    user = User.new(nil, rated)
    until @movies.size > 21 - queue.size
      id = all_ids.sample
      movie = Movie.new(
        id,
        all_movies[id][:title],
        all_movies[id][:year],
        all_movies[id][:viewers],
        all_movies[id][:avg_rating]
      )
      unless rated[id] || queue[id] || calculated[id] || movie.predicted_rating_for(user) < user.compute_avg_rating
        @movies << movie
      end
      calculated[id] = true
    end

    render "api/recommender/movies.json.jbuilder"
  end

  private
  def recommender_params
    params.require(:recommender).permit(:rated, :queue)
  end
end
