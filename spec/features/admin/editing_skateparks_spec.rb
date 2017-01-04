require "rails_helper"

RSpec.feature "Admin can edit skateparks" do
  let(:skatepark) { create(:skatepark) }

  before do
    sign_in_user(create(:user, :admin))
    visit edit_admin_skatepark_path(skatepark)
  end

  scenario "change a skatepark's address" do
    fill_in "Address", with: "667 Barnold St."
    click_button "Update Skatepark"

    expect(page).to have_content "Skatepark was successfully updated."
    expect(page).to have_content "667 Barnold St."
  end

  context "when coordinates" do
    let(:neighbor_location) { create(:location, latitude: 10.0555, longitude: -11.0555) }
    let!(:neighbor_park) { create(:skatepark, location: neighbor_location) }

    context "are added" do
      scenario "neighbor_parks are associated to skatepark" do
        fill_in "Latitude", with: 9.9999
        fill_in "Longitude", with: -11.0666
        click_button "Update Skatepark"

        expect(skatepark.reload.neighbor_parks).to include(neighbor_park)
        expect(neighbor_park.reload.neighbor_parks).to include(skatepark)
      end
    end

    context "are updated" do
      let(:old_location)          { create(:location, latitude: 56.200, longitude: -56.666) }
      let!(:skatepark)            { create(:skatepark, location: old_location) }
      let(:old_neighbor_location) { create(:location, latitude: 56.000, longitude: -56.5656) }
      let!(:old_neighbor_park)    { create(:skatepark, location: old_neighbor_location) }

      scenario "old neighbors are unassociated, new ones are added" do
        fill_in "Latitude", with: 9.9999
        fill_in "Longitude", with: -11.0666
        click_button "Update Skatepark"

        skatepark.reload
        expect(skatepark.neighbor_parks).to include(neighbor_park)
        expect(skatepark.neighbor_parks).to_not include(old_neighbor_park)

        expect(neighbor_park.reload.neighbor_parks).to include(skatepark)
        expect(old_neighbor_park.reload.neighbor_parks).to_not include(skatepark)
      end
    end
  end
end
