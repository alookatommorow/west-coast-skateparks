require 'rails_helper'

RSpec.describe '/skateparks/state' do
  describe '#show' do
    it 'renders the _state partial' do
      get '/skateparks/state', params: { state: 'oregon' }

      expect(response).to render_template('_state')
    end
  end
end
