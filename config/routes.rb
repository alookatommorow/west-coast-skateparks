Rails.application.routes.draw do
  scope module: 'buttercms' do
    get '/categories/:slug' => 'categories#show', :as => :buttercms_category
    get '/author/:slug' => 'authors#show', :as => :buttercms_author

    get '/news/rss' => 'feeds#rss', :format => 'rss', :as => :buttercms_blog_rss
    get '/news/atom' => 'feeds#atom', :format => 'atom', :as => :buttercms_blog_atom
    get '/news/sitemap.xml' => 'feeds#sitemap', :format => 'xml', :as => :buttercms_blog_sitemap

    get '/news(/page/:page)' => 'posts#index', :defaults => { page: 1 }, :as => :buttercms_blog
    get '/news/:slug' => 'posts#show', :as => :buttercms_post
  end

  namespace :admin do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
  end

  resources :users, only: %i[show create new edit update]

  resources :sessions, only: %i[create destroy new]

  namespace :api do
    resources :skateparks, only: :index, param: :slug do
      member do
        patch :favorite
        patch :unfavorite

        patch :visit
        patch :unvisit
      end
    end
  end

  namespace :skateparks do
    resource :state, only: :show do
      resource :letter, only: :show
    end
    get :search
  end

  namespace :vendor do
    resources :sessions, only: :create
  end

  resources :skateparks, only: %i[index show], param: :slug do
    resource :weather, only: :show, controller: 'skateparks/weather'
  end

  resources :maps, only: :show
  resources :ratings, only: :create
  resources :reviews, only: :create

  get '/sitemap.xml.gz', to: redirect("https://#{ENV['S3_BUCKET']}.s3.amazonaws.com/sitemaps/sitemap.xml.gz"),
                         as: :sitemap

  get '/pages/home', to: redirect('/')
end
