require "rails_helper"

RSpec.feature "Admin can edit skateparks" do
  let(:location)  { create(:location, address: "223 Barnyard Dr.") }
  let(:skatepark) { create(:skatepark, location: location) }

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
end
