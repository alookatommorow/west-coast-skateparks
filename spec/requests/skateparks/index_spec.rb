require "rails_helper"

RSpec.describe "/skateparks" do
  describe "GET #index" do
    it "renders view" do
      get "/skateparks"

      expect(response).to render_template :index
    end
  end
end
