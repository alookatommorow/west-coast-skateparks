class ChangeTypeOfRatingInRatings < ActiveRecord::Migration[5.0]
  def change
    change_column :ratings, :rating, :float
  end
end
