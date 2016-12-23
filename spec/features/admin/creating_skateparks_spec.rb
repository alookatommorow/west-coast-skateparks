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

    expect(page).to have_content "Skatepark has been created."
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

    expect(page).to have_content "Location city can't be blank"

    fill_in "City", with: "Nowheresville"
    click_button "Create Skatepark"

    expect(page).to have_content "Skatepark has been created."
    expect(page).to have_content "Nowhere park"
    expect(page).to have_content "Nowheresville"
  end

  context "when there are other skateparks nearby" do
    let(:location)     { create(:location, latitude: 37.780845, longitude: -122.403060) }
    let!(:nearby_park) { create(:skatepark, location: location) }
    let!(:far_park)    { create(:skatepark) }

    scenario "nearby parks are automatically associated" do
      fill_in "Name", with: "Fekken Perk"
      fill_in "City", with: "San Francisco"
      fill_in "State", with: "California"
      fill_in "Latitude", with: 37.80081
      fill_in "Longitude", with: -122.506969
      click_button "Create Skatepark"

      skatepark = Skatepark.last
      expect(skatepark.nearby_parks).to include(nearby_park)
      expect(skatepark.nearby_parks).not_to include(far_park)
      expect(nearby_park.nearby_parks).to include(skatepark)
    end
  end
end
