class AddHeroToSkateparks < ActiveRecord::Migration[5.0]
  def up
    add_attachment :skateparks, :hero
  end

  def down
    remove_attachment :skateparks, :hero
  end
end
