class AddLocationColumnsToSkateparks < ActiveRecord::Migration[5.0]
  def change
    add_column :skateparks, :address, :string
    add_column :skateparks, :city, :string
    add_column :skateparks, :latitude, :float
    add_column :skateparks, :longitude, :float
    add_column :skateparks, :state, :string
    add_column :skateparks, :zip_code, :string

    Location.includes(:skatepark).all.each do |loc|
      loc.skatepark.update!(
        address: loc.address,
        city: loc.city,
        latitude: loc.latitude,
        longitude: loc.longitude,
        state: loc.state,
        zip_code: loc.zip_code,
      )
    end
  end
end
