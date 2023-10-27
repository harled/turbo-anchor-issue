Rails.application.routes.draw do
  get 'anchor/index'
  get 'anchor/discussion'

  get 'anchor/mark_as_read'
  post 'anchor/mark_as_read'
  patch 'anchor/mark_as_read'
  put 'anchor/mark_as_read'
  delete 'anchor/mark_as_read'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "anchor#index"
end
