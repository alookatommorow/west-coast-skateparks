class CreateVisits < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.belongs_to :user, index: true
      t.belongs_to :skatepark, index: true

      t.timestamps null: false
    end

    add_index :visits, [:user_id, :skatepark_id], unique: true
  end
end
