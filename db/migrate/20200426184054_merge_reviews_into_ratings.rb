class MergeReviewsIntoRatings < ActiveRecord::Migration[5.0]
  def up
    add_column :ratings, :stars, :integer
    add_column :ratings, :review, :text

    Rating.all.each do |rating|
      stars = rating.rating
      rating.stars = stars < 3 ? stars.ceil : stars.floor

      review = Review.find_by(
        user_id: rating.user_id,
        skatepark_id: rating.skatepark_id
      )
      rating.review = review&.review

      rating.save!
    end

    change_column_null :ratings, :stars, false
  end

  def down
    Rating.all.each do |rating|
      rating.rating = rating.stars.to_f
      rating.save!
    end

    remove_column :ratings, :stars
    remove_column :ratings, :review
  end
end
