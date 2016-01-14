class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.belongs_to :user, index: true
      t.belongs_to :skatepark, index: true

      t.timestamps null: false
    end

    add_index :favorites, [:user_id, :skatepark_id], unique: true
  end
end
