class RemoveRatingFromRatings < ActiveRecord::Migration[5.0]
  def change
    remove_column :ratings, :rating
  end
end
