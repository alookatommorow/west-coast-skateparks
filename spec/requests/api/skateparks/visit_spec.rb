require "rails_helper"

RSpec.describe "/api/skateparks" do
  describe "PATCH #visit" do
    it "adds user to skatepark visitors" do
      skatepark = create(:skatepark)
      user = create(:user)

      patch "/api/skateparks/#{skatepark.slug}/visit", params: { user_id: user.id }

      expect(response).to be_ok
      expect(skatepark.visitors).to include user
    end
  end
end
