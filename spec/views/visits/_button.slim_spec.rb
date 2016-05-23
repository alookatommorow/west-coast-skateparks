require "rails_helper"

RSpec.describe "/visits/_button.slim", type: :view do
  it "renders Been Here button if favorite does not exist" do
    render partial: "button", locals: {
      visit: nil,
      user: create(:user),
      skatepark: create(:skatepark),
    }

    expect(rendered).to match(/Been Here/)
    expect(rendered).not_to match(/delete/)
  end

  it "renders Never Been Here button if visit exists" do
    visit = create(:visit)

    render partial: "button", locals: {
      visit: visit,
      user: visit.user,
      skatepark: visit.skatepark,
    }

    expect(rendered).to match(/Never Been Here/)
    expect(rendered).to match(/delete/)
  end
end
