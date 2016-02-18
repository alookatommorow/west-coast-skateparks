Rails.application.routes.draw do
  namespace :admin do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
  end

  mount MagicLamp::Genie, at: '/magic_lamp' if defined?(MagicLamp)

  resources :users, only: [:show, :new, :create]
  get '/users/:id/map_data', to: 'users#map_data', as: 'user_map_data'
  resources :sessions, only: [:create, :destroy]
  resources :skateparks
  get '/skateparks/:id/map_data', to: 'skateparks#map_data', as: 'skatepark_map_data'

  get '/state', to: 'skateparks#state', as: 'state'
  get '/search', to: 'skateparks#search', as: 'search'

  post '/visits', to: 'visits#create'
  put '/visits', to: 'visits#update'

  post '/favorites', to: 'favorites#create'
  put '/favorites', to: 'favorites#update'

  put '/rate', to: 'opinions#rate'
  put '/review', to: 'opinions#review'

  get 'about', to: 'welcome#about', as: 'about'
  root 'welcome#index'
end
