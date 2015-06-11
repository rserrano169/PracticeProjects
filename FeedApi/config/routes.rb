NewsReader::Application.routes.draw do
  namespace :api do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :feeds, only: [:index, :create, :show] do
      resources :entries, only: [:index]
    end
  end

  root to: "static_pages#index"
end
