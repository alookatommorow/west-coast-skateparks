class AddStarsToSkateparks < ActiveRecord::Migration[7.1]
  def change
    add_column :skateparks, :stars, :float
  end
end
