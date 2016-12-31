require "rails_helper"

RSpec.feature "Admin can create skateparks" do
  before do
    sign_in_user(create(:user, :admin))
    visit new_admin_skatepark_path
  end

  scenario "successfully" do
    fill_in "Name", with: "Fekken Perk"
    fill_in "Address", with: "56 56th st."
    fill_in "City", with: "Modesto"
    fill_in "State", with: "Washington"
    fill_in "Rating", with: "5"
    fill_in "Material", with: "plexi-glass"
    click_button "Create Skatepark"

    expect(page).to have_content "Skatepark was successfully created."
    expect(page).to have_content "Fekken Perk"
    expect(page).to have_content "56 56th st."
    expect(page).to have_content "Modesto"
    expect(page).to have_content "Washington"
    expect(page).to have_content "plexi-glass"
  end

  scenario "with incomplete location" do
    fill_in "Name", with: "Nowhere park"
    fill_in "Rating", with: "5"
    fill_in "State", with: "California"
    click_button "Create Skatepark"

    expect(page).to have_content "Citycan't be blank"

    fill_in "City", with: "Nowheresville"
    click_button "Create Skatepark"

    expect(page).to have_content "Nowhere park"
    expect(page).to have_content "Nowheresville"
  end

  context "when there are other neighboring skateparks" do
    let(:nearby)          { create(:location, latitude: 9.7777, longitude: -12.0001) }
    let!(:neighbor_park)  { create(:skatepark, location: nearby) }
    let!(:far_park)       { create(:skatepark, :far) }

    scenario "neighbor parks are automatically associated" do
      fill_in "Name", with: "Fekken Perk"
      fill_in "City", with: "San Francisco"
      fill_in "State", with: "California"
      fill_in "Latitude", with: 9.9999
      fill_in "Longitude", with: -12.2666
      click_button "Create Skatepark"

      skatepark = Skatepark.last
      expect(skatepark.neighbor_parks).to include(neighbor_park)
      expect(skatepark.neighbor_parks).not_to include(far_park)
      expect(neighbor_park.reload.neighbor_parks).to include(skatepark)

      skatepark.destroy
      expect(neighbor_park.neighbor_parks).to be_empty
    end
  end
end
