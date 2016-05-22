Rails.application.routes.draw do
  namespace :admin do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
  end

  resources :users, only: [:show, :create, :new] do
    resource :map, only: :show, controller: 'users/maps'
  end

  resources :sessions, only: [:create, :destroy, :new]
  post '/sessions/create_with_auth', to: 'sessions#create_with_auth'

  namespace :skateparks do
    resource :search, only: [:show, :new]
    resource :state, only: :show do
      resource :letter, only: :show
    end
  end

  resources :skateparks do
    resource :map, only: :show, controller: 'skateparks/maps'
  end

  resources :ratings, only: :create
  resources :reviews, only: :create

  resources :favorites, only: :create
  delete '/favorites/:user_id/:skatepark_id', to: 'favorites#destroy'

  resources :visits, only: :create
  delete '/visits/:user_id/:skatepark_id', to: 'visits#destroy'

  get "/pages/home", to: redirect("/")
end
