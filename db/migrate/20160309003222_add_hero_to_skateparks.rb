class AddHeroToSkateparks < ActiveRecord::Migration
  def up
    add_attachment :skateparks, :hero
  end

  def down
    remove_attachment :skateparks, :hero
  end
end
