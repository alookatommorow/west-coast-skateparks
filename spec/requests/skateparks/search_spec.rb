require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #search' do
    it 'sets instance vars' do
      create_list(:skatepark, 2, state: 'california').sort_by(&:city)
      [create(:skatepark, state: 'oregon')]
      all_parks = Skatepark.all.order(:state, :city, :name)

      get '/skateparks/search'

      expect(assigns(:skateparks)).to eq json(all_parks)
    end
  end

  def json(parks)
    ActiveModelSerializers::SerializableResource.new(
      parks,
      each_serializer: Search::SkateparkSerializer
    ).as_json
  end
end
