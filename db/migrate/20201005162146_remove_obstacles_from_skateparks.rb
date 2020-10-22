class RemoveObstaclesFromSkateparks < ActiveRecord::Migration[6.0]
  def change
    remove_column :skateparks, :obstacles
  end
end
