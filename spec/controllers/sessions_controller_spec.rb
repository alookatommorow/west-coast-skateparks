require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe '#create' do
    it 'signs a user in and redirects with flash message' do
      user = create(:user)

      post :create, session: {
        username: user.username,
        password: user.password
      }

      expect(session[:id]).to eq(user.id)
      expect(flash[:notice]).to eq("Welcome, #{user.display_name}")
    end

    it 'flashes like a bitch if it shits the bed' do
      user = build(:user)

      post :create, session: {
        username: user.username,
        password: user.password
      }

      expect(session[:id]).to be_nil
      expect(flash[:error]).to eq('Sign in failed')
    end
  end

  describe '#create_with_auth' do
    it 'creates a user if one cannot be found by email, and signs them in' do
      allow(URI).to receive(:parse)
      auth_params = {
        name: 'DudeBroMan',
        email: 'fuckbuttsdaily@swag.net',
        username: 'fuckbuttsdaily@swag.net',
        avatar: 'http://butt-plugs.gov/test_image.png'
      }

      post :create_with_auth, auth_params

      expect(User.last.name).to eq('DudeBroMan')
      expect(User.last.email).to eq('fuckbuttsdaily@swag.net')
      expect(User.last.username).to eq(User.last.email)
      expect(URI).to have_received(:parse).with('http://butt-plugs.gov/test_image.png')
      expect(session[:id]).to eq(User.last.id)
      expect(response.body).to eq(User.last.id.to_json)
    end

    it 'signs in a user if one can be found by email' do
      user = create(:user)

      post :create_with_auth, email: user.email

      expect(session[:id]).to eq(user.id)
      expect(response.body).to eq(user.id.to_json)
    end

    context 'when user does not have email associated with their account' do
      it 'it cracks their bitch ass with a flash error' do
        allow(URI).to receive(:parse)
        auth_params = {
          name: 'Irie Dingus',
          email: nil
        }

        expect(post :create_with_auth, auth_params).to render_template('_flashes')
        expect(flash[:error]).to eq('No email detected, please create an account or add email to your Facebook')
      end
    end
  end
end
