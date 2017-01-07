require "rails_helper"

RSpec.describe Skateparks::LettersController, type: :controller do
  render_views

  describe "#show" do
    it "renders skatepark table" do
      expect(
        get :show, params: {
          state_id: "rancho cookamonga", letter: "bitch", page: 1
        }
      ).to render_template("_state")
    end

    it "renders parks in a specific state who's name begins with letter param" do
      anusland = create(:location, state: "oregon", city: "Anusland")
      assholeland = create(:location, state: "slutland", city: "Assholeland")
      butteholeland = create(:location, state: "hookerland", city: "Butteholeland")

      skatepark_a = create(:skatepark, location: anusland)
      skatepark_a_washington = create(:skatepark, location: assholeland)
      skatepark_b = create(:skatepark, location: butteholeland)

      get :show, params: {
        state_id: "oregon", letter: "a", page: 1
      }

      expect(response.body).to include("Oregon")
      expect(response.body).to include(skatepark_a.name.titleize)
      expect(response.body).to include(skatepark_a.city)
      expect(response.body).not_to include(skatepark_a_washington.name)
      expect(response.body).not_to include(skatepark_a_washington.city)
      expect(response.body).not_to include(skatepark_b.name)
      expect(response.body).not_to include(skatepark_b.city)
    end
  end
end
