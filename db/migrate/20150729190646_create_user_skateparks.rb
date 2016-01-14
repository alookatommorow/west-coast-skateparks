class CreateUserSkateparks < ActiveRecord::Migration
  def change
    create_table :user_skateparks do |t|
      t.integer :user_id
      t.integer :skatepark_id
      t.integer :rating
      t.string :username
      t.string :review
      t.string :review_date
      t.boolean :favorite, default: false
      t.boolean :visited, default: false
      t.timestamps
    end
  end
end
