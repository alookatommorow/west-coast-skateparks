require "rails_helper"

RSpec.feature "Admin can create skateparks" do
  before do
    sign_in_user(create(:user, :admin))
    visit new_admin_skatepark_path
  end

  scenario "successfully" do
    fill_in "Address", with: "56 56th st."
    fill_in "City", with: "Modesto"
    select "washington", from: "State"
    fill_in "Name", with: "Fekken Perk"
    select "5", from: "Rating"
    fill_in "Material", with: "plexi-glass"
    fill_in "Designer", with: "Barny Inc."
    fill_in "Builder", with: "Bob"
    fill_in "Opened", with: "Never."
    fill_in "Hours", with: "12am - 6am"
    fill_in "Size", with: "5600"
    fill_in "Notes", with: "THIS PARK IS SICK"
    fill_in "Info", with: "FUCK"
    fill_in "Helmet", with: "YEE"
    fill_in "Lights", with: "NAW"
    fill_in "Photo cred", with: "Atiba"
    fill_in "Photo url", with: "https://barn.com/kook.jpeg"
    fill_in "Video url", with: "https://barn.com/kook.mp4"
    fill_in "Obstacles", with: "Flat ground"

    click_button "Create Skatepark"

    expect(page).to have_content "Skatepark was successfully created."
    expect(page).to have_content "Fekken Perk"
    expect(page).to have_content "56 56th st."
    expect(page).to have_content "Modesto"
    expect(page).to have_content "washington"
    expect(page).to have_content "plexi-glass"
  end

  scenario "with incomplete location" do
    fill_in "Name", with: "Nowhere park"
    select "5", from: "Rating"
    select "california", from: "State"
    click_button "Create Skatepark"

    expect(page).to have_content "Location city can't be blank"

    fill_in "City", with: "Nowheresville"
    click_button "Create Skatepark"

    expect(page).to have_content "Nowhere park"
    expect(page).to have_content "Nowheresville"
  end

  context "when there are other neighboring skateparks" do
    let!(:neighbor_park)  { create(:skatepark, latitude: 9.7777, longitude: -12.0001) }
    let!(:far_park)       { create(:skatepark, :far) }

    scenario "neighbor parks are automatically associated" do
      fill_in "Name", with: "Fekken Perk"
      fill_in "City", with: "San Francisco"
      select "california", from: "State"
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
