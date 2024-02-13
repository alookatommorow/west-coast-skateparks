require "rails_helper"

RSpec.describe "/skateparks" do
  describe "GET #show" do
    it "sets instance vars" do
      skatepark = create(:skatepark)
      ratings = []

      get "/skateparks/#{skatepark.slug}"

      expect(assigns(:skatepark)).to eq skatepark
      expect(assigns(:ratings)).to eq ratings
    end

    context "with ratings" do
      it "sets ratings instance var" do
        skatepark = create(:skatepark)
        rating = create_list(:rating, 2, skatepark: skatepark)
        ratings = ActiveModelSerializers::SerializableResource.new(
          skatepark.ratings.order(created_at: :desc),
          adapter: :attributes,
          each_serializer: RatingSerializer
        ).as_json

        get "/skateparks/#{skatepark.slug}"

        expect(assigns(:ratings)).to eq ratings
      end
    end

    context "with logged in user" do
      it "sets has_favorited and has_visited instance vars" do
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
