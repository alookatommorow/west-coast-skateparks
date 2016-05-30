require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  context "when user tries to visit another user's profile" do
    it 'ejaculates in their face with a flash error' do
      user = create(:user)

      get :show, id: user.id + 1

      expect(flash[:error]).to eq("Sign in to see your profile")

      session[:id] = user.id
      get :show, id: user.id + 1

      expect(flash[:error]).to eq("That's not your profile")
    end
  end
end