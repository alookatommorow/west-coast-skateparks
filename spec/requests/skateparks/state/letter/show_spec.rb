require 'rails_helper'

RSpec.describe '/skateparks/state/letters' do
  describe 'GET #show' do
    it 'renders skatepark table' do
      get '/skateparks/state/letter', params: {
        state_id: 'rancho cookamonga', letter: 'bitch', page: 1
      }

      expect(response).to render_template('_state')
    end
  end
end
