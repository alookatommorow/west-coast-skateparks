class CreateSkateparks < ActiveRecord::Migration
  def change
    create_table :skateparks do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :rating
      t.string :designer
      t.string :builder
      t.string :opened
      t.string :address
      t.string :hours
      t.string :size
      t.string :notes
      t.string :helmet

      t.timestamps
    end
  end
end
