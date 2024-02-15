require 'rails_helper'

RSpec.describe '/api/skateparks' do
  describe 'GET #index' do
    it 'returns skatepark JSON' do
      create_list(:skatepark, 3)

      expected = Skatepark.all.as_json(
        only: %i[slug name city state]
      )

      get '/api/skateparks'

      expect(json_body).to eq(expected)
    end
  end
end
