require "rails_helper"

RSpec.describe Location, type: :model do
  describe "#has_coordinates?" do
    it 'returns true if the location has latitude and longitude' do
      location = create(:location)
      expect(location).to have_coordinates
    end

    it 'returns false if the location does not have latitude or longitude' do
      location = create(:location, latitude: nil)
      expect(location).to_not have_coordinates
    end
  end


  describe "#to_s" do
    it "returns a properly formatted address" do
      location = build(:location, city: "Dirty Browntown", zip_code: 90210)
      expect(location.to_s).to eq("520 E 3rd Ave, Dirty Browntown, CA 90210")

      location.zip_code = nil
      expect(location.to_s).to eq("520 E 3rd Ave, Dirty Browntown, CA")
    end
  end
end
