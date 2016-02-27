require 'rails_helper'

RSpec.describe SkateparksController, type: :controller do
  describe '#search' do
    render_views

    it 'renders the _search_results partial' do
      expect(get :search, search: 'sup').to render_template('_search_results')
    end

    it 'renders all the results matching the search param' do
      skateparks = create_list(:skatepark, 3) # named hayward
      get :search, search: 'Hay'

      skateparks.each do |sp|
        expect(response.body).to include(
          "#{sp.city.titleize}", "#{sp.state.titleize}")
      end
    end

    it 'renders "No Results" if search does not yield anything' do
      get :search, search: 'ripmaster'

      expect(response.body).to include('No results')
    end
  end

  describe '#state' do
    render_views

    it 'renders the _state partial' do
      expect(get :state, state: 'California').to render_template('_state')
    end

    it 'renders all the skateparks in a state' do
      skateparks = create_list(:skatepark, 3)
      out_of_state = create(:skatepark, state: 'Washington')
      get :state, state: 'California'

      skateparks.each do |sp|
        expect(response.body).to include(sp.city.titleize)
      end
      expect(response.body).to_not include(out_of_state.city.titleize)
    end
  end

  describe '#map_data' do
    it 'serves JSON object with skatepark and nearby_parks' do
      skateparks = create_list(:skatepark, 2)
      expected = skateparks.first.map_data.to_json

      get :map_data, id: skateparks.first.id
      expect(response.body).to eq(expected)
    end
  end
end
