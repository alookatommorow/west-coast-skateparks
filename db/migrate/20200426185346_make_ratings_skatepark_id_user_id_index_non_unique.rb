class MakeRatingsSkateparkIdUserIdIndexNonUnique < ActiveRecord::Migration[5.0]
  # TODO: If we allow non-unique reviews people might spam some shit or skew the reviews...
  # We could limit it to a certain amount, or we could just make them unique and show (edited)
  # on reviews that were edited.
  def change
    remove_index :ratings, column: [:user_id, :skatepark_id]
    add_index :ratings, [:user_id, :skatepark_id]
  end
end
