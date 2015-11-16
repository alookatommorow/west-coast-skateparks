  class CreateSkateparks < ActiveRecord::Migration
  def change
    create_table :skateparks do |t|
      t.string :name
      t.string :city
      t.string :state
      t.string :identifier
      t.string :rating
      t.string :address
      t.string :material
      t.string :designer
      t.string :builder
      t.string :opened
      t.text :hours
      t.string :size
      t.text :notes
      t.text :beta
      t.string :helmet
      t.string :lights
      t.string :photo_cred
      t.string :video_url
      t.integer :num_pics
      t.text :obstacles

      t.timestamps
    end
  end
end
