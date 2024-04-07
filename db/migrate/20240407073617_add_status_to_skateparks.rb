class AddStatusToSkateparks < ActiveRecord::Migration[7.1]
  def change
    add_column :skateparks, :status, :integer, null: false, default: 0
  end
end
