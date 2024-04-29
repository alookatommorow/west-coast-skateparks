require 'rails_helper'

RSpec.describe '/users' do
  describe 'GET #show' do
    context 'with unauthenticated user' do
      it 'ejaculates in their face with a flash error' do
        get '/users/1'

        expect(response).to redirect_to new_session_path
        expect(flash[:error]).to eq('Sign in to see your profile')
      end
    end

    context 'with authenticated user' do
      it 'sets instance vars' do
        user = create(:user)
        skateparks = create_list(:skatepark, 2)
        create(:rating, skatepark: skateparks.first, user:)
        user.favorites << skateparks.first
        user.visits << skateparks.second

        map_json = { maps: 'here n there' }
        allow_any_instance_of(User).to receive(:map_data).and_return(map_json)

        sign_in user

        get "/users/#{user.id}"

        expect(assigns(:user)).to eq UserSerializer.new(user).serialize
        expect(assigns(:skateparks)).to eq map_json
        expect(assigns(:num_ratings)).to eq user.ratings.count
      end

      context 'when trying to access other profile' do
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
