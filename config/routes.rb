Rails.application.routes.draw do
  namespace :admin do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
  end

  mount MagicLamp::Genie, at: '/magic_lamp' if defined?(MagicLamp)

  resources :users, only: [:show, :create]
  get '/users/:id/map_data', to: 'users#map_data', as: 'user_map_data'
  resources :sessions, only: [:create, :destroy]
  post '/sessions/create_with_auth', to: 'sessions#create_with_auth'
  resources :skateparks

  namespace :skateparks do
    resources :searches, only: :create
  end

  get '/skateparks/:id/map_data', to: 'skateparks#map_data', as: 'skatepark_map_data'
  resources :skatepark_images, only: [:create, :destroy]
  resources :ratings, only: :create
  resources :reviews, only: :create

  resources :favorites, only: :create
  delete '/favorites/:user_id/:skatepark_id', to: 'favorites#destroy'

  resources :visits, only: :create
  delete '/visits/:user_id/:skatepark_id', to: 'visits#destroy'

  get '/state', to: 'skateparks#state', as: 'state'
  get '/search', to: 'skateparks#search', as: 'search'

  get 'about', to: 'welcome#about', as: 'about'
  root 'welcome#index'
end
