require 'rails_helper'

RSpec.describe Skateparks::StatesController, type: :controller do
  describe '#show' do
    let!(:or_skateparks) { create_list(:skatepark, 3, state: "oregon") }

    it 'renders the _state partial' do
      expect(get :show,
        params: {
          state: 'oregon'
        }
      ).to render_template('_state')
    end

    context "with skateparks in different states" do
      let!(:wa_skatepark) { create(:skatepark, state: "washington") }

      # move to view specs
      xit 'renders the skateparks in a state (paginated)' do
        get :show, params: {
          state: 'oregon', page: 1
        }

        or_skateparks.each do |sp|
          puts simple_format(sp.city.titleize)
          expect(response.body).to include(sp.city.titleize)
        end
        expect(response.body).to_not include(wa_skatepark.city.titleize)
      end
    end
  end
end
