require 'rails_helper'

describe 'post /visits' do
  it 'creates a Visit' do
    user = create(:user)
    skatepark = create(:skatepark)

    post '/visits', user_id: user.id, skatepark_id: skatepark.id

    visit = Visit.where(
      user_id: user.id, skatepark_id: skatepark.id).first

    expect(visit).to be_truthy
  end
end

describe 'put /visits' do
  it 'destroys a Visit' do
    user = create(:user)
    skatepark = create(:skatepark)
    Visit.create(
      user_id: user.id, skatepark_id: skatepark.id)

    put '/visits', user_id: user.id, skatepark_id: skatepark.id

    visit = Visit.where(
      user_id: user.id, skatepark_id: skatepark.id).first

    expect(visit).to be_falsey
  end
end
