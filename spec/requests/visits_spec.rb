require 'rails_helper'

describe 'post /visits' do
  it 'creates a UserSkatepark and sets visit = true' do
    user = create(:user)
    skatepark = create(:skatepark)

    post '/visits', user_id: user.id, skatepark_id: skatepark.id

    visit = UserSkatepark.where(
      user_id: user.id, skatepark_id: skatepark.id)

    expect(visit.visited).to eq(true)
  end
end
