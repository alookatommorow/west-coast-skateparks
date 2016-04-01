class AddAttachmentMapPhotoToSkateparks < ActiveRecord::Migration
  def self.up
    change_table :skateparks do |t|
      t.attachment :map_photo
    end
  end

  def self.down
    remove_attachment :skateparks, :map_photo
  end
end
