require "rails_helper"

RSpec.describe "/favorites/_button.slim", type: :view do
  it "renders Favorite button if favorite does not exist" do
    render partial: "button", locals: {
      favorite: nil,
      user: create(:user),
      skatepark: create(:skatepark),
    }

    expect(rendered).to match(/Favorite/)
    expect(rendered).not_to match(/delete/)
  end

  it "renders Unfavorite button if favorite exists" do
    favorite = create(:favorite)

    render partial: "button", locals: {
      favorite: favorite,
      user: favorite.user,
      skatepark: favorite.skatepark,
    }

    expect(rendered).to match(/Unfavorite/)
    expect(rendered).to match(/delete/)
  end
end
