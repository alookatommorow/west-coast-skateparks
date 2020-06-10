class AddLocationColumnsToSkateparks < ActiveRecord::Migration[5.0]
  def change
    add_column :skateparks, :address, :string
    add_column :skateparks, :city, :string
    add_column :skateparks, :latitude, :float
    add_column :skateparks, :longitude, :float
    add_column :skateparks, :state, :string
    add_column :skateparks, :zip_code, :string

    Skatepark.includes(:location).all.each do |skatepark|
      skatepark.update!(
        address: skatepark.address,
        city: skatepark.city,
        latitude: skatepark.latitude,
        longitude: skatepark.longitude,
        state: skatepark.state,
        zip_code: skatepark.zip_code,
      )
    end
  end
end
