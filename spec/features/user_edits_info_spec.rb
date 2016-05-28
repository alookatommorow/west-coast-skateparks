require "rails_helper"

RSpec.feature "user edits info" do
  scenario "their info is updated" do
    user = create(:user)

    sign_in_user(user)

    visit user_path(user)

    click_on "Edit Info"

    expect(page).to have_text("update")

  end
end