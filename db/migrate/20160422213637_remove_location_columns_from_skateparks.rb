class RemoveLocationColumnsFromSkateparks < ActiveRecord::Migration
  def change
    remove_columns :skateparks,
      :address,
      :city,
      :state,
      :latitude,
      :longitude
  end
end
