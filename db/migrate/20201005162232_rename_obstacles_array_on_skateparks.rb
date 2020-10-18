class RenameObstaclesArrayOnSkateparks < ActiveRecord::Migration[6.0]
  def change
    rename_column :skateparks, :obstacles_array, :obstacles
  end
end
