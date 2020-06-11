class AddNotNullConstraintToCityAndStateOnSKateparks < ActiveRecord::Migration[5.0]
  def change
    change_column_null :skateparks, :city, false
    change_column_null :skateparks, :state, false
    change_column_null :skateparks, :name, false
  end
end
