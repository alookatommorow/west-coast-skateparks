require "rails_helper"

RSpec.describe "/favorites/_button.slim", type: :view do
  let(:user) { create(:user) }
  let(:skatepark) { create(:skatepark) }

  it "renders Favorite button if favorite does not exist" do
    render partial: "button", locals: {
      user: user,
      skatepark: skatepark,
    }

    expect(rendered).to match(/Favorite/)
  end

  it "renders Unfavorite button if favorite exists" do
    user.favorites << skatepark

    render partial: "button", locals: {
      user: user,
      skatepark: skatepark,
    }

    expect(rendered).to match(/Unfavorite/)
  end
end
