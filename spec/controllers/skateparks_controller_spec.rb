require 'rails_helper'

RSpec.describe SkateparksController, type: :controller do
  describe '#map_data' do
    it 'serves JSON object with skatepark and nearby_parks' do
      skateparks = create_list(:skatepark, 2)
      expected = skateparks.first.map_data.to_json

      get :map_data, id: skateparks.first.id
      expect(response.body).to eq(expected)
    end
  end

  describe '#search' do
    it 'renders partial with search results' do
      get :search, search: 'lincoln'

      expect(response).to render_template(partial: '_search')
    end
  end

  describe '#state' do
    it 'renders partial with skateparks by state' do
      get :state, state: 'washington'

      expect(response).to render_template(partial: '_state')
    end
  end
end
