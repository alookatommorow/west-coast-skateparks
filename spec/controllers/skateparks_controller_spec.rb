require 'rails_helper'

RSpec.describe SkateparksController, type: :controller do
  describe '#search' do
    render_views

    it 'renders the _search partial' do
      expect(get :search, search: 'sup').to render_template('_search')
    end

    it 'renders the results matching the search param' do
      skateparks = create_list(:skatepark, 3)
      get :search, search: skateparks.first.city

      skateparks.each do |sp|
        expect(response.body).to include(
          "#{sp.city.titleize} (#{sp.state.titleize}")
      end
    end

    it 'renders "No Results" if search does not yield anything' do
      get :search, search: 'ripmaster'

      expect(response.body).to include('No results')
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
