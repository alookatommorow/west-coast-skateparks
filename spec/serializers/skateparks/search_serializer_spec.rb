require 'rails_helper'

RSpec.describe Skateparks::SearchSerializer do
  it 'declares map attributes' do
    attributes = %i[slug name city state latitude longitude stars map_photo]

    expect(Skateparks::MapSerializer.attributes).to eq attributes
  end
end
