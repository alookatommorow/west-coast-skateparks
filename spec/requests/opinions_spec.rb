require 'rails_helper'

describe 'put /rate' do
  it 'creates rating' do
    user = create(:user)
    skatepark = create(:skatepark)
    Rating.create(
      user_id: user.id, skatepark_id: skatepark.id)

    put '/rate', user_id: user.id, id: skatepark.id, rating: 5

    rating = Rating.where(
      user_id: user.id, skatepark_id: skatepark.id).first.rating

    expect(rating).to eq(5)
  end
end

describe 'put /review' do
  it 'adds review for review' do
    user = create(:user)
    skatepark = create(:skatepark)
    Review.create(
      user_id: user.id, skatepark_id: skatepark.id)

    put '/review', user_id: user.id, id: skatepark.id, review: 'this park iz chill'

    review = Review.where(
      user_id: user.id, skatepark_id: skatepark.id).first.review

    expect(review).to eq('this park iz chill')
  end
end
