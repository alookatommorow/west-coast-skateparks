Rails.application.routes.draw do


  resources :users, only: [:show, :new, :create]
  resources :sessions, only: [:new, :create, :destroy]
  resources :skateparks
  get '/states/:state/skateparks', to: 'skateparks#state', as: 'state'
  put '/users/:user_id/skateparks/:id/add_favorite', to: 'skateparks#add_favorite', as: 'add_favorite'
  put '/users/:user_id/skateparks/:id/remove_favorite', to: 'skateparks#remove_favorite', as: 'remove_favorite'
  put '/users/:user_id/skateparks/:id/add_visit', to: 'skateparks#add_visit', as: 'add_visit'
  put '/users/:user_id/skateparks/:id/remove_visit', to: 'skateparks#remove_visit', as: 'remove_visit'
  put '/users/:user_id/skateparks/:id/rate', to: 'skateparks#rate', as: 'rate'
  root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
