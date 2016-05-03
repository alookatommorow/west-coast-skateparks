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
    resources :favorites, only: %i(create destroy)
    resources :visits, only: %i(create destroy)
  end

  resources :ratings, only: :create
  resources :reviews, only: :create

  get "/pages/home", to: redirect("/")
end
