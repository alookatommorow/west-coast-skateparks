class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|t.belongs_to :user, index: true
      t.belongs_to :skatepark, index: true
      t.string :review

      t.timestamps null: false
    end

    add_index :reviews, [:user_id, :skatepark_id], unique: true
  end
end
