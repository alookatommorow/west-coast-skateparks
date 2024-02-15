require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe '#create' do
    it 'signs a user in and redirects with flash message' do
      user = create(:user)

      post :create, params: {
        session: {
          username: user.username,
          password: user.password
        }
      }

      expect(session[:id]).to eq(user.id)
      expect(flash[:notice]).to eq("Welcome, #{user}")
    end

    it 'flashes like a bitch if it shits the bed' do
      user = build(:user)

      post :create, params: {
        session: {
          username: user.username,
          password: user.password
        }
      }

      expect(session[:id]).to be_nil
      expect(flash[:error]).to eq('Sign in failed')
    end
  end

  describe '#destroy' do
    it 'clears the session and redirects with a flash message' do
      id = 25
      session[:id] = id

      delete :destroy, params: {
        id:
      }

      expect(session[:id]).to be(nil)
      expect(response).to redirect_to(root_path)
      expect(flash[:notice]).to be_present
    end
  end
end
