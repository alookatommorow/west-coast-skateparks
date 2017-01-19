class DropNeighborsTable < ActiveRecord::Migration[5.0]
  def change
    drop_table :neighbors
  end
end
