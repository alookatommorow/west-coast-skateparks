class AddNameAndUidToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :uid, :string
    add_column :users, :name, :string
    add_index :users, :uid
  end
end
