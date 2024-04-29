require 'rails_helper'

RSpec.describe Skateparks::MapSerializer do
  it 'declares map attributes' do
    attributes = %i[slug name city state latitude longitude stars map_photo]

    expect(Skateparks::MapSerializer.new.attributes).to eq attributes
  end
end
