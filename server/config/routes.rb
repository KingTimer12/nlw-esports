Rails.application.routes.draw do
  resources :ads, only: [:index, :show] do
    get 'discord', action: :discord, controller: 'ads'
  end
  resources :games do
    resources :ads
  end
end
