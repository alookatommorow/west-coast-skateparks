class AddSlugToSkateparks < ActiveRecord::Migration[5.0]
  def change
    add_column :skateparks, :slug, :string
    add_index :skateparks, :slug, unique: true

    Skatepark.find_each(&:save)
  end
end
