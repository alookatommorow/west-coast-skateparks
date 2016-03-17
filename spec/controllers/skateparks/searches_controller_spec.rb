require 'rails_helper'

RSpec.describe Skateparks::SearchesController, type: :controller do
  describe '#create' do
    render_views

    it 'renders _search_results partial' do
      expect(post :create, search: 'ballsack').to render_template(partial: '_search_results')
    end

    it 'returns a partial with results matchin search params' do
      create_list(:skatepark, 2, state: 'washington')
      create(:skatepark, state: 'oregon')

      post :create, search: 'washington'

      expect(response.body).to include('Washington')
      expect(response.body).to_not include('Oregon')
    end

    it 'renders "No Results" if search does not yield anything' do
      post :create, search: 'ripmaster'

      expect(response.body).to include('No Results')
    end
  end
end
