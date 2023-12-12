class AddAttachmentPhotoToSkateparkImages < ActiveRecord::Migration[5.0]
  def self.up
    change_table :skatepark_images do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :skatepark_images, :photo
  end
end
