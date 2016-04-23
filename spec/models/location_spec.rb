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
end
