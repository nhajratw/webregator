Rails.application.routes.draw do

  # get 'landing/index'

  get '/indexer' => 'webmark_indexer#index'
  get '/react' => 'react#index'
  get '/angular' => 'user_dashboard#index'

  resources :webmarks
  root 'landing#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
