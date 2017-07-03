Rails.application.routes.draw do
  resources :webmarks
  get 'user_dashboard/index'
  root 'user_dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
