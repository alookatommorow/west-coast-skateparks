require 'rails_helper'

RSpec.describe '/users' do
  describe "PATCH #update" do
    context "when user updates info" do
      it 'verifies their righteousness' do
        user = create(:user)
        username = "butthead"
        sign_in user

        patch "/users/#{user.id}", params: {
          user: {
            username: username,
          }
        }

        expect(flash[:notice]).to eq "Righteous."
        expect(response).to redirect_to user
        expect(user.reload.username).to eq username
      end
    end

    context "when user tries to update with invalid info" do
      it 'lets them know they are barning' do
        user = create(:user)
        sign_in user

        patch "/users/#{user.id}", params: {
          user: {
            username: "",
          }
        }

        expect(flash[:error]).to eq "Username can't be blank"
        expect(response).to render_template "edit"
      end
    end
  end
end
