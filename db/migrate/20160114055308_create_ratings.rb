class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.belongs_to :user, index: true
      t.belongs_to :skatepark, index: true
      t.integer :rating

      t.timestamps null: false
    end

    add_index :ratings, [:user_id, :skatepark_id], unique: true
  end
end
