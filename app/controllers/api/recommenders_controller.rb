require 'set'
class Api::RecommendersController < ApplicationController

    # Eventually go toward Rails CRUD Conventions
    # index, create, show, update, destroy
    def training_movies_index
        #fetch movies for new visitors to rate
        @movies = Movie.movies_with_many_reviews
        render "api/recommender/movies.json.jbuilder"
    end

    def get_movies_by_ids
        movie_ids = recommender_params[:movieIds]
        movie_attr = eval($redis.get('movies'))
        @movies = []
        movie_ids.each do |movie_id|
            id = movie_id.to_i
            @movies << Movie.new(id,
            movie_attr[id][:title],
            movie_attr[id][:year],
            movie_attr[id][:viewers],
            movie_attr[id][:avg_rating],
            movie_attr[id][:imdb_id],
            nil)
        end
        render "api/recommender/movies.json.jbuilder"
    end

    def recommendations
        @movies = []
        rated = Hash.new
        recommender_params[:rated].each do |key, val|
            rating = val.to_f
            rated[key.to_i] = rating
        end
        messages = []
        if rated.size < 5
            messages << "Need at least 5 ratings to calculate"
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
    def generate_recommendations(user, queue, items_needed=10)
        movie_attr = eval($redis.get('movies'))
        movie_ids = eval($redis.get('movie_ids'))
        features = eval($redis.get('features'))
        calculated = {}
        until @movies.size > items_needed
            id = movie_ids.sample
            unless user.ratings[id] || queue[id] || calculated[id] || movie_attr[id][:viewers].length < 20
                movie = Movie.new(id,
                movie_attr[id][:title],
                movie_attr[id][:year],
                movie_attr[id][:viewers],
                movie_attr[id][:avg_rating],
                movie_attr[id][:imdb_id],
                features[id])
                # Using k-Nearest Neighbor and SVD to generate predictions
                svd_prediction = movie.svd_prediction_for(user)
                knn_prediction = movie.knn_prediction_for(user)
                calculated[id] = true
                puts "#{movie.title} => knn: #{knn_prediction}, svd: #{svd_prediction}, user_avg: #{user.avg_rating}"
                if knn_prediction.nil?
                    @movies << movie if svd_prediction > user.avg_rating
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
