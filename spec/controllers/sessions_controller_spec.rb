require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe '#create' do
    it  'signs a user in and redirects with flash message' do
      user = create(:user)

      post :create, id: user.id, username: user.username, password: user.password

      expect(session[:id]).to eq(user.id)
      expect(flash[:notice]).to eq("Welcome, #{user.display_name}")
    end
  end

  describe '#create_with_auth' do
    it 'finds a user by uid and signs them in' do
      user = create(:user, uid: 'skiddlybeebop7534', name: 'Melvin Nipplebottom')

      post :create_with_auth, name: user.name, id: user.uid

      expect(session[:id]).to eq(user.id)
      expect(response.body).to eq(user.id.to_json)
    end

    it 'creates a user if user cannot be found with uid' do
      user = build(:user, uid: 'scrimpleton6435wr', name: 'Raymond Shrimp Boy Chow')

      post :create_with_auth, name: user.name, id: user.uid

      expect(User.last.name).to eq(user.name)
      expect(User.last.uid).to eq(user.uid)
      expect(session[:id]).to eq(User.last.id)
      expect(response.body).to eq(User.last.id.to_json)
    end
  end
end
