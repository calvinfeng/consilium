
# This is not RESTful at all, eventually we will use ActiveRecord Models

Rails.application.routes.draw do
  root to: "static_pages#root"
  # get 'api/recommender/training_movies', :to => 'api/recommenders#training_movies_index'
  # post 'api/recommender/recommended_movies', :to => 'api/recommenders#recommended_movies_index'
  # post 'api/recommender/movies_by_ids', :to => 'api/recommenders#get_movies_by_ids'

  namespace :api, defaults: { format: :json } do
      resources :movies, only:[:index]
  end

  get  'api/movies/most_viewed', :to => 'api/movies#fetch_most_viewed'
  post 'api/movies/recommendations', :to => 'api/movies#recommendations'
  post 'api/users/preference', :to => 'api/users#compute_preference'

end

# This is so fucking wrong, using POST to get data, just because GET doesn't support large params
# This needs to be changed ASAP
