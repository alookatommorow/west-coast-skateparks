require 'rails_helper'

describe 'put /rate' do
  it 'Adds rating for UserSkatepark' do
    user = create(:user)
    skatepark = create(:skatepark)
    UserSkatepark.create(
      user_id: user.id, skatepark_id: skatepark.id, visited: true)

    put '/rate', user_id: user.id, id: skatepark.id, rating: 5

    rating = UserSkatepark.where(
      user_id: user.id, skatepark_id: skatepark.id).first.rating

    expect(rating).to eq(5)
  end
end

describe 'put /review' do
  it 'Adds review for UserSkatepark' do
    user = create(:user)
    skatepark = create(:skatepark)
    UserSkatepark.create(
      user_id: user.id, skatepark_id: skatepark.id, visited: true)

    put '/review', user_id: user.id, id: skatepark.id, review: 'this park iz chill'

    review = UserSkatepark.where(
      user_id: user.id, skatepark_id: skatepark.id).first.review
    
    expect(review).to eq('this park iz chill')
  end
end
