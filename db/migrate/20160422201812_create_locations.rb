class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.references :skatepark, index: true, foreign_key: true
      t.string :address
      t.string :city
      t.string :state
      t.string :zip_code
      t.float :latitude
      t.float :longitude
    end

    Skatepark.all.each do |skatepark|
      if skatepark[:address]
        @address = skatepark[:address].split(',').first
        @zip_code = skatepark[:address].split(' ').last
        @zip_code = @zip_code =~ /\d/ ? @zip_code : nil
      end

      Location.create(
        address: @address,
        city: skatepark[:city].titleize,
        state: skatepark[:state].capitalize,
        skatepark_id: skatepark.id,
        zip_code: @zip_code,
        latitude: skatepark[:latitude],
        longitude: skatepark[:longitude],
      )
    end
  end
end
