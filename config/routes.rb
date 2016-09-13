Rails.application.routes.draw do
  root to: "static_pages#root"
  post 'api/regressions', :to => 'api/regressions#linear_regression'
  get 'api/recommender/top', :to => 'api/recommenders#top_movies'
end
