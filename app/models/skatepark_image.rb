class SkateparkImage < ActiveRecord::Base
  belongs_to :skatepark
  has_attached_file :photo
  validates_attachment_presence :photo
  validates_attachment_content_type :photo, content_type: /\Aimage/
end