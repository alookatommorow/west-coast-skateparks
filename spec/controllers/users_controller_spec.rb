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

  describe "#update" do
    context "when user updates info" do
      it 'verifies their righteousness' do
        user = create(:user)
        session[:id] = user.id

        put :update, id: user.id,
          user: {
            username: "butthead",
          }

        expect(flash[:notice]).to eq("Righteous.")
        expect(response).to redirect_to(user)
      end
    end
    context "when user tries to update with invalid info" do
      it 'lets them know they are barning' do
        user = create(:user)
        session[:id] = user.id

        put :update, id: user.id,
          user: {
            username: "",
          }

        expect(flash[:error]).to eq("Username can't be blank")
        expect(response).to render_template("edit")
      end
    end
  end
end
