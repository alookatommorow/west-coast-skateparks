class NearbyParks < ActiveRecord::Migration
  def up
    create_table :nearby_parks, id: false do |t|
      t.integer :skatepark_id
      t.integer :nearby_park_id
    end

    add_index(:nearby_parks, [:skatepark_id, :nearby_park_id], unique: true)
    add_index(:nearby_parks, [:nearby_park_id, :skatepark_id], unique: true)

    # create all existing nearby_park associations
    print "Associating nearby parks..."
    Skatepark.all.each do |skatepark|
      skatepark.send(:associate_nearby_parks) if skatepark.has_coordinates?
      print "."
    end
    puts
  end

  def down
    drop_table :nearby_parks
  end
end
