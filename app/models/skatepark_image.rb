class SkateparkImage < ActiveRecord::Base
  belongs_to :skatepark

  validates :skatepark, presence: true

  has_attached_file :photo, styles: { thumb: '300x200>' }
  validates_attachment_presence :photo
  validates_attachment_content_type :photo, content_type: /\Aimage/
end