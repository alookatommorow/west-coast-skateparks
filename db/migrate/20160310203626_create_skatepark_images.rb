class CreateSkateparkImages < ActiveRecord::Migration[5.0]
  def change
    create_table :skatepark_images do |t|
      t.string :caption
      t.belongs_to :skatepark, index: true

      t.timestamps null: false
    end
  end
end
