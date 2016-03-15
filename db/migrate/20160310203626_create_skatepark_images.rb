class CreateSkateparkImages < ActiveRecord::Migration
  def change
    create_table :skatepark_images do |t|
      t.string :caption
      t.belongs_to :skatepark, index: true

      t.timestamps null: false
    end
  end
end
