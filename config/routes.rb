Rails.application.routes.draw do
  root to: "static_pages#root"
  post 'api/regressions', :to => 'api/regressions#linear_regression'
  get 'api/recommender/new_visitor', :to => 'api/recommenders#for_new_visitor'
end
