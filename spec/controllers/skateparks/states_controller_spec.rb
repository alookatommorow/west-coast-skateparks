require 'rails_helper'

RSpec.describe Skateparks::StatesController, type: :controller do
  render_views

  describe '#show' do
    let(:oregon) { create(:location, state: "oregon") }
    let!(:or_skateparks) { create_list(:skatepark, 3, location: oregon) }

    it 'renders the _state partial' do
      expect(get :show,
        params: {
          state: 'oregon'
        }
      ).to render_template('_state')
    end

    context "with skateparks in different states" do
      let(:washington) { create(:location, state: "washington") }
      let!(:wa_skatepark) { create(:skatepark, location: washington) }

      it 'renders the skateparks in a state (paginated)' do
        get :show, params: {
          state: 'oregon', page: 1
        }

        or_skateparks.each do |sp|
          expect(response.body).to include(sp.city.titleize)
        end
        expect(response.body).to_not include(wa_skatepark.city.titleize)
      end
    end
  end
end
