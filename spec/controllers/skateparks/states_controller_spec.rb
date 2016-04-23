require 'rails_helper'

RSpec.describe Skateparks::StatesController, type: :controller do
  render_views

  describe '#show' do
    it 'renders the _state partial' do
      expect(get :show, state: 'california').to render_template('_state')
    end

    it 'renders all the skateparks in a state' do
      skateparks = create_list(:skatepark, 3, :oregon)
      out_of_state = create(:skatepark, :washington)
      get :show, state: 'oregon'

      skateparks.each do |sp|
        expect(response.body).to include(sp.city.titleize)
      end
      expect(response.body).to_not include(out_of_state.city.titleize)
    end
  end
end
