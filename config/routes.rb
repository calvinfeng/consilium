Rails.application.routes.draw do
  root to: "static_pages#root"
  post 'api/regressions', :to => 'api/regressions#linear_regression'
  post 'api/recommender/recommendations', :to => 'api/recommenders#recommendations'
  post 'api/recommender/movies_by_ids', :to => 'api/recommenders#get_movies_by_ids'
  get 'api/recommender/new_visitor', :to => 'api/recommenders#for_new_visitor'
end
