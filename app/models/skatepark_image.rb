# == Schema Information
#
# Table name: skatepark_images
#
#  id                 :integer          not null, primary key
#  caption            :string
#  photo_content_type :string
#  photo_file_name    :string
#  photo_file_size    :bigint
#  photo_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  skatepark_id       :integer
#
# Indexes
#
#  index_skatepark_images_on_skatepark_id  (skatepark_id)
#
class SkateparkImage < ActiveRecord::Base
  belongs_to :skatepark

  validates :skatepark, presence: true

  has_attached_file :photo, styles: { thumb: '300x200>' }
  validates_attachment_presence :photo
  validates_attachment_content_type :photo, content_type: /\Aimage/
end
