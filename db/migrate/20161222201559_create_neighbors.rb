class CreateNeighbors < ActiveRecord::Migration
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

        neighbor_parks = Skatepark.includes(:location).nearby_to(skatepark).where.not(id: skatepark.id)
        neighbor_parks.each do |park|
          # we only have to do this check once, when we're updating the existing records
          skatepark.neighbor_parks << park unless skatepark.neighbor_parks.include?(park)
        end
        print "."
      end
      puts "DONEZO"
    end
  end

  def down
    drop_table :neighbors
  end
end
