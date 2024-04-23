require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #show' do
    it 'sets instance vars' do
      skatepark = create(:skatepark)
      ratings = []
      allow(skatepark).to receive(:ratings).and_return ratings

      get "/skateparks/#{skatepark.slug}"

      expect(assigns(:skatepark)).to eq skatepark
      expect(assigns(:ratings)).to eq ratings
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

    context 'with ratings' do
      it 'sets ratings instance var' do
        skatepark = create(:skatepark)
        create_list(:rating, 2, skatepark:)
        mock_json = [{ hey: 'youre looking great' }]
        serializer = instance_double(RatingSerializer)

        allow(RatingSerializer).to receive(:new).and_return(serializer)
        allow(serializer).to receive(:serialize).and_return(mock_json)

        get "/skateparks/#{skatepark.slug}"

        expect(assigns(:ratings)).to eq mock_json
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
