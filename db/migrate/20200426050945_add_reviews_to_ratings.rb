class AddReviewsToRatings < ActiveRecord::Migration[5.0]
  # TODO: TEST THIS ON LOC
  def up
    add_column :ratings, :review, :text

    Rating.all.each do |rating|
      review = Review.where(user_id: rating.user_id, skatepark_id: rating.skatepark_id).take
      rating.review = review if review
      rating.save!
    end
  end

  def down
    remove_column :ratings, :review
  end
end
