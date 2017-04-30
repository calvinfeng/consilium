class Api::UsersController < ApplicationController
    def compute_preference
        movie_ratings = Hash.new
        params[:movie_ratings].each do |movie_id, rating|
            movie_ratings[movie_id] = rating.to_f
        end

        @new_user = User.new(movie_ratings)
        render 'api/users/preference.json.jbuilder'
    end
end
