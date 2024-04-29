require 'rails_helper'

RSpec.describe Skateparks::ShowSerializer do
  it 'declares map attributes' do
    attributes = %i[id slug name city state map_photo stars obstacles hours material designer builder
                    opened size lights address info average_rating status]

    expect(Skateparks::ShowSerializer.new.attributes).to eq attributes
  end
end
