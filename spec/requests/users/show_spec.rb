require 'rails_helper'

RSpec.describe '/users' do
  describe "GET #show" do
    context "with unauthenticated user" do
      it 'ejaculates in their face with a flash error' do
        get '/users/1'

        expect(response).to redirect_to new_session_path
        expect(flash[:error]).to eq("Sign in to see your profile")
      end
    end

    context "with authenticated user" do
      it 'sets user instance var' do
        user = create(:user)
        sign_in user

        get "/users/#{user.id}"

        expect(assigns(:user)).to eq user
      end

      context "when trying to access other profile" do
        it "fucks 'em" do
          user = create(:user)

          sign_in user

          get "/users/#{user.id + 1}"

          expect(flash[:error]).to eq("That's not your profile")
        end
      end
    end
  end
end
