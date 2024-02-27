require 'rails_helper'

RSpec.describe '/skateparks' do
  describe 'GET #show' do
    it 'sets instance vars' do
      skatepark = create(:skatepark)
      ratings = []

      get "/skateparks/#{skatepark.slug}"

      expect(assigns(:skatepark)).to eq skatepark
      expect(assigns(:ratings)).to eq ratings
    end

    context 'with ratings' do
      it 'sets ratings instance var' do
        skatepark = create(:skatepark)
        create_list(:rating, 2, skatepark:)
        mock_json = [{ hey: 'youre looking great' }]

        allow(RatingSerializer).to receive(:json).and_return(mock_json)

        get "/skateparks/#{skatepark.slug}"

        expect(assigns(:ratings)).to eq mock_json
      end
    end

    context 'with logged in user' do
      it 'sets has_favorited and has_visited instance vars' do
        user = create(:user)
        skatepark = create(:skatepark)
        skatepark.visitors << user
        skatepark.favoriters << user

        sign_in user

        get "/skateparks/#{skatepark.slug}"

        expect(assigns(:has_favorited)).to be true
        expect(assigns(:has_visited)).to be true
      end
    end
  end
end
