require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe "#show" do
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

  describe "#create" do
    it "sets flash[:signed_up] to true for analytics" do
      post :create,
        user: {
          username: "buttstuff",
          email: "sacklick@69.gmail.com",
          password: "FUCKUBRO",
        }

      expect(flash[:signed_up]).to eq(true)
    end
  end
end
