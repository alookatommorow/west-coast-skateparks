require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "#create" do
    it "creates user and signs them in" do
      user_params = {
        username: "buttstuff",
        email: "sacklick@69.gmail.com",
        password: "FUCKUBRO",
      }

      post :create, params: { user: user_params }

      created_user = User.last

      expect(flash[:signed_up]).to eq true
      expect(session[:id]).to eq created_user.id
      expect(created_user.username).to eq user_params[:username]
      expect(created_user.email).to eq user_params[:email]
    end
  end
end
