Rails.application.routes.draw do
  root to: "static_pages#root"
  post 'api/regressions', :to => 'api/regressions#linear_regression'
end
