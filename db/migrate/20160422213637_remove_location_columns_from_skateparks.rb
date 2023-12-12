class RemoveLocationColumnsFromSkateparks < ActiveRecord::Migration[5.0]
  def change
    remove_columns :skateparks,
      :address,
      :city,
      :state,
      :latitude,
      :longitude
  end
end
