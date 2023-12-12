class RemoveNumPicsFromSkateparks < ActiveRecord::Migration[5.0]
  def change
    remove_column :skateparks, :num_pics, :integer
  end
end
