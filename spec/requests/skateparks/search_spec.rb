require "rails_helper"

RSpec.describe "/skateparks" do
  describe "GET #search" do
    it "sets instance vars" do
      query = 'butts'
      ca_parks = create_list(:skatepark, 2, state: 'california').sort_by(&:city)
      or_parks = [create(:skatepark, state: 'oregon')]

      get "/skateparks/search", params: { query: query }

      expect(assigns(:ca_parks)).to eq json(ca_parks)
      expect(assigns(:or_parks)).to eq json(or_parks)
      expect(assigns(:wa_parks)).to eq []
      expect(assigns(:query)).to eq query
    end
  end

  def json(parks)
    ActiveModelSerializers::SerializableResource.new(
      parks,
      each_serializer: Search::SkateparkSerializer
    ).as_json
  end
end