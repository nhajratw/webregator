Rails.application.routes.draw do

  get '/indexer' => 'webmark_indexer#index'
  get '/react' => 'react#index'

  resources :webmarks
  root 'user_dashboard#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
