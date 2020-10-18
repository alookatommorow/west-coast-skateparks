class AddObstaclesArrayToSkateparks < ActiveRecord::Migration[6.0]
  def change
    add_column :skateparks, :obstacles_array, :string, array: true

    Skatepark.all.each do |park|
      park.update(obstacles_array: park.obstacles&.split(', '))
    end
  end
end
