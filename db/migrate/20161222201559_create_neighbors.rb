class CreateNeighbors < ActiveRecord::Migration[5.0]
  def up
    create_table :neighbors do |t|
      t.integer :skatepark_id
      t.integer :neighbor_park_id
    end

    add_index(:neighbors, [:skatepark_id, :neighbor_park_id], unique: true)
    add_index(:neighbors, [:neighbor_park_id, :skatepark_id], unique: true)

    Skatepark.transaction do
      print "Associating neighbor parks..."
      Skatepark.all.each do |skatepark|
        next unless skatepark.has_coordinates?
        skatepark.send(:associate_neighbor_parks)
        print "."
      end
      puts "DONEZO"
    end
  end

  def down
    drop_table :neighbors
  end
end
