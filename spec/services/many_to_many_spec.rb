# require 'spec_helper'
require 'rails_helper'

RSpec.describe ManyToMany do
  describe '.create' do
    it 'creates an ActiveRecord object with foreign keys and named attribute' do
      user = create(:user)
      skatepark = create(:skatepark)
      review = "This is chill"
      params = {
        "user_id" => user.id,
        "skatepark_id" => skatepark.id,
        "review" => review
      }
      ManyToMany.create(Review, params)

      expect(Review.last.user_id).to eq(user.id)
      expect(Review.last.skatepark_id).to eq(skatepark.id)
      expect(Review.last.review).to eq(review)
    end

    it 'updates attributes if the ManyToMany already exists' do
      user = create(:user)
      skatepark = create(:skatepark)
      rating = create(:rating, rating: 5)
      params = {
        "user_id" => user.id,
        "skatepark_id" => skatepark.id,
        "rating" => 2
      }
      ManyToMany.create(Rating, params)

      expect(Rating.last.user_id).to eq(user.id)
      expect(Rating.last.skatepark_id).to eq(skatepark.id)
      expect(Rating.last.rating).to eq(2)
    end
  end
end
