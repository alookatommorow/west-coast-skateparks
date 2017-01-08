require 'rails_helper'

RSpec.describe Skateparks::WeatherController, type: :controller do
  describe '#show' do
    it 'renders the _weather partial' do
      skatepark = create(:skatepark)
      stub_weather

      get :show, params: {
        skatepark_id: skatepark.id, latitude: skatepark.latitude, longitude: skatepark.longitude
      }

      expect(response).to render_template('_weather')
    end
  end
end
