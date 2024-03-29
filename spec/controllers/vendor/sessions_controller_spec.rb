require 'rails_helper'

RSpec.describe Vendor::SessionsController do
  describe '#create' do
    it 'creates a user if one cannot be found by email, and signs them in' do
      vendor_auth_params = {
        name: 'DudeBroMan',
        email: 'cheeselover@swag.net',
        username: 'cheeselover@swag.net'
      }

      post :create, params: vendor_auth_params

      expect(User.last.name).to eq('DudeBroMan')
      expect(User.last.email).to eq('cheeselover@swag.net')
      expect(User.last.username).to eq(User.last.email)
      expect(session[:id]).to eq(User.last.id)
      expect(response.body).to eq(User.last.id.to_json)
    end

    it 'signs in a user if one can be found by email' do
      user = create(:user)

      post :create, params: {
        email: user.email
      }

      expect(session[:id]).to eq(user.id)
      expect(response.body).to eq(user.id.to_json)
    end

    context 'when user does not have email associated with their account' do
      it 'it cracks their bitch ass with a flash error' do
        vendor_auth_params = {
          name: 'Irie Dingus',
          email: nil
        }

        expect(post(:create, params: vendor_auth_params)).to render_template('_flashes')
        expect(flash[:error]).to eq('No email detected, please create an account or add email to your Facebook')
      end
    end
  end
end
