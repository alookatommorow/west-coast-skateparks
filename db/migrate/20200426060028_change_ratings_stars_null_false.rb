class ChangeRatingsStarsNullFalse < ActiveRecord::Migration[5.0]
  def change
    change_column_null :ratings, :stars, false
  end
end
