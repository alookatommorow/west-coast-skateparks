class RemoveAuthAndUidFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :auth
    remove_column :users, :uid
  end
end
