class ChangeRatingsSkateparkUserIdIndexNonUnique < ActiveRecord::Migration[5.0]
  def change
    # Remove uniqueness constraint
    remove_index :ratings, column: [:user_id, :skatepark_id]
    add_index :ratings, [:user_id, :skatepark_id]
  end
end
