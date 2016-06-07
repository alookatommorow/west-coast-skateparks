require 'rails_helper'

RSpec.describe Skateparks::SearchesController, type: :controller do
  describe '#show' do
    render_views

    it 'renders _search_results partial' do
      expect(get :show, search: 'ballsack').to render_template(partial: '_search_results')
    end

    it 'returns a partial with results matching search params' do
      location = create(:location, city: "Hayward")
      create_list(:skatepark, 2, location: location)
      skatepark = create(:skatepark)
      create(:location, city: "Boner Point", skatepark: skatepark)

      get :show, search: "hayward"

      expect(response.body).to include("Hayward")
      expect(response.body).to_not include(skatepark.city)
    end

    it 'renders "No Results" if search does not yield anything' do
      get :show, search: 'ripmaster'

      expect(response.body).to include('No Results')
    end
  end
end
