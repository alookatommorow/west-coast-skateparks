require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #show' do
    it 'sets instance vars' do
      skatepark = create(:skatepark)
      serializer = instance_double(Skateparks::ShowSerializer)
      skatepark_json = { hey: 'sup' }
      map_json = { maps: 'here n there' }
      allow(Skateparks::MapData).to receive(:for).with(skatepark).and_return(map_json)
      allow(Skateparks::ShowSerializer).to receive(:new).with(skatepark).and_return(serializer)
      allow(serializer).to receive(:serialize).and_return(skatepark_json)

      get "/skateparks/#{skatepark.slug}"

      expect(assigns(:skatepark)).to eq skatepark
      expect(assigns(:skatepark_json)).to eq skatepark_json
      expect(assigns(:map_data)).to eq map_json
    end

    context 'when slug has changed' do
      it 'sets has_favorited and has_visited instance vars' do
        skatepark = create(:skatepark)
        old_slug = skatepark.slug

        skatepark.update(name: 'new skatepark name')

        get "/skateparks/#{old_slug}"

        expect(response).to redirect_to skatepark_path(skatepark)
      end
    end

    context 'with logged in user' do
      it 'sets has_favorited and has_visited instance vars' do
        user = build_stubbed(:user)
        skatepark = create(:skatepark)

        allow(user).to receive(:visited?).and_return true
        allow(user).to receive(:favorited?).and_return true

        sign_in user

        get "/skateparks/#{skatepark.slug}"

        expect(assigns(:has_favorited)).to be true
        expect(assigns(:has_visited)).to be true
      end
    end
  end
end
