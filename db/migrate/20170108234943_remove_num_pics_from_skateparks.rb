class RemoveNumPicsFromSkateparks < ActiveRecord::Migration
  def change
    remove_column :skateparks, :num_pics, :integer
  end
end
